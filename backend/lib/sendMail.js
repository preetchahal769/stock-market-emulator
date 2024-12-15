import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();
const oAuth2Client = new google.auth.OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  process.env.MAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });

export const sendVerificationEmail = async (email, otp, res, req) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "Stock Market Emulator <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Stock Market Emulator 🚀",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4CAF50; color: white; padding: 16px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Email Verification</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Thank you for signing up! Please use the OTP below to verify your email address:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; color: #4CAF50; font-weight: bold; border: 1px dashed #4CAF50; padding: 10px 20px; border-radius: 4px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>5 minutes</strong>. Please do not share this OTP with anyone.</p>
        <p style="font-size: 14px; color: #555;">If you did not request this, please ignore this email.</p>
      </div>
      <div style="background-color: #f9f9f9; padding: 16px; text-align: center; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #888; margin: 0;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
    
        `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log("Email sent to " + req);
    // logger.info(`Email sent to ${req}`);

    return info.response;
  } catch (error) {
    throw error;
  }
};
