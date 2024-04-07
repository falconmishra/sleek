import { Hashpassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import randonString from "randomstring";
import productModel from "../models/productModel.js";

//register function
export const routerController = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //validations
    if (!username) {
      res.send({ error: "username is required" });
      return;
    }

    if (!email) {
      res.send({ error: "email is required" });
      return;
    }

    if (!password) {
      res.send({ error: "password is required" });
      return;
    }
    if (!address) {
      res.send({ error: "password is required" });
      return;
    }

    //checking for existing user

    const userExsist = await userModel.findOne({ email });

    if (userExsist) {
      res.status(200).send({ message: "User with that email already exists" });
      return;
    }

    //register User
    const hashPassword = await Hashpassword(password);
    const user = await new userModel({
      username,
      email,
      address,
      password: hashPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    console.log("This is the error " + error);
    res.status(500).send({
      sucess: false,
      message: error,
      error,
    });
  }
};

//Post login Function
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //token creation
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const expirationDate = new Date(Date.now() + 2589200000);

    user.token = token;
    user.tokenExpiration = expirationDate;
    await user.save();

    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        email: user.email,
        username: user.username,
        id: user._id,
        address: user.address,
      },
      token,
      isAdmin: user.role ? true : false,
    });
    // cookieParser.JSONCookie(token);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//test controller
export const testController = async (req, res) => {
  const { token } = req.cookie || req.cookies;
  if (!token) {
    res.status(200).send({
      success: false,
      message: "No token is found",
    });
    return;
  }
  const user = await userModel.findOne({ token });
  if (!user) {
    res.status(200).send({
      success: false,
      message: "No user found with that token",
      token: token,
    });
    return;
  }
  res.status(200).send({
    success: true,
    message: "token found successfully",
    user: {
      email: user.email,
      username: user.username,
      id: user._id,
      address: user.address,
    },
    token,
    isAdmin: user.role ? true : false,
  });
};

const sendResetPasswordMail = async (email, token) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    let resetLink =
      "http://localhost:8080/api/v1/user/reset-password?token=" + token;

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Reset password on Sleek",
      text: `Hi there! Your reset password link is as follows
      ${resetLink}`,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail has been sent : ", info.response);
      }
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Email  could not be sent" });
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "Email doesn't exists",
      });
    }
    const Token = randonString.generate();
    const data = await userModel.updateOne(
      { email },
      { $set: { token: Token } }
    );
    sendResetPasswordMail(email, Token);
    res.status(200).send({
      success: true,
      message: "Check your registered email inbox for reset link",
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  // console.log(req.body);
  try {
    const user = await userModel.findOne({
      token: token,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    } else {
      //hash the password and update it in database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.token = null;
      user.resetExpire = null;
      await user.save();
      res.json({ msg: "Password has been changed successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error on server");
  }
};
