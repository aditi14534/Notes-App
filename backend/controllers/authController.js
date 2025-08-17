import User from "../models/userModel.js";
import { errorHandler } from "../middleware/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const isValidUser = await User.findOne({ email });

  if (isValidUser) {
    return next(errorHandler(400, "User already Exist"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    // ✅ Cross-site compatible cookie setup
    const isProd = process.env.NODE_ENV === "production";

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: isProd, // Localhost par false, production par true
        sameSite: isProd ? "None" : "Lax", // Cross-site ke liye "None"
        maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful!",
        rest,
      });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: isProd, // prod mein true
      sameSite: isProd ? "None" : "Lax", // prod mein None
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
