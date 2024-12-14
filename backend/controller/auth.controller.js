import { sendVerificationEmail } from "../lib/sendMail.js";
import bcrypt from "bcryptjs";
import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import logger from "../lib/logger.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    email,
    dateOfBirth,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = await User.create({
      fullName,
      email,
      dateOfBirth,
      phoneNumber,
      password,
    });
    const { accessToken, refreshToken } = generateTokens(newUser._id);
    await storeRefreshToken(newUser._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    logger.info(`$userName: {newUser.fullName}, email: ${newUser.email} created`);
    logger.info("Tokens created");
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      dateOfBirth: newUser.dateOfBirth,
      phoneNumber: newUser.phoneNumber,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(`Error creating user: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      logger.info(`userName: ${user.fullName}, email: ${user.email} Logged in`);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_TOKEN
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    logger.info(`User logged out`);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ msg: "server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ msg: "No refresh token found" });
    }
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN
    );
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (storedToken !== refreshToken) {
      return res.status(401).json({ msg: "Invalid refresh token" });
    }
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    logger.info("Token refreshed")
    res.json({ msg: "Token refreshed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const verificationMail = async (req, res) => {
  try {
    const { email } = req.user;
    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    await sendVerificationEmail(email, otp, res);

    if (user) {
      user.verificationToken = hashedOtp;
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Otp sent successfully , Check your mail inbox" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (!user.verificationToken) {
      return res.status(400).json({
        message: "Verification token not found , Resend the verification email",
      });
    }

    const isVerified = await bcrypt.compare(otp, user.verificationToken);

    if (!isVerified) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.userVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {}
};
