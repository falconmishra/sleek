import { Hashpassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import randonString from "randomstring";

//register function
export const routerController = async (req, res) => {
  try {
    const { username, email, password, address, contact } = req.body;

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
    if (!contact) {
      res.send({ error: "password is required" });
      return;
    }

    //checking for existing user

    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Welcome to Sleek!",
      text: `Hi there! Welcome to Sleek!`,
      html: `
        <h1>Welcome to Sleek!</h1>
        <p>Hello ${username}!</p>
        <p>Welcome aboard! We're thrilled to have you join us.</p>
        <p>Sleek is your ultimate Fashion and Shopping destination.</p><br>
        <p>We're a team of passionate people who are dedicated to providing you with the best shopping experience.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
        <br>
        <p>Our <a href="https://www.instagram.com/akshat___maurya/"> Instagram</a>,<a href="https://twitter.com/Akshat__Maurya"> Twitter(X)</a>,<a href="https://www.linkedin.com/in/akshatmaurya25/"> Linkedin</a></p>
        <br>

        <p>Best regards,<br>Team Sleek</p>
      `,
    };

    const userExsist = await userModel.findOne({ email });

    if (userExsist) {
      res.status(200).send({ message: "User with that email already exists" });
      return;
    }
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail has been sent : ", info.response);
      }
    });
    //register User
    const hashPassword = await Hashpassword(password);
    const user = await new userModel({
      username,
      email,
      address,
      password: hashPassword,
      contact,
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
      return res.status(404).send({
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
        pincode: user.pincode,
        contact: user.contact,
      },
      token,
      isAdmin: user.role ? true : false,
    });
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
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    let resetLink = "http://localhost:5173/reset-password?token=" + token;

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Reset password on Sleek",
      text: `Hi there! You initiated a reset password request. Click the following link `,
      html: ` <h1>Password Reset</h1>
      <p>Hello there!</p>
      <p>You initiated a password reset request. To reset your password, please click the following link:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request a password reset, you can ignore this message.</p>
      <p>Best regards,<br>Your Sleek Team</p>`,
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
      { $set: { resetToken: Token } }
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

  try {
    const user = await userModel.findOne({
      resetToken: token,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    if (token == user.resetToken) {
      user.resetToken = null;
      user.password = await Hashpassword(password);
      await user.save();
      return res.status(200).send({
        success: true,
        message: "Password Reset successfully!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error on server");
  }
};
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All users fetched",
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
