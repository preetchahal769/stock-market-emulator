import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
  // console.log(req.body);
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
    setCookies(res, accessToken, refreshToken);
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

      setCookies(res, accessToken, refreshToken);

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
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
