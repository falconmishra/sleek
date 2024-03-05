import { Hashpassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import cookieParser from "cookie-parser";

//register function
export const routerController = async (req, res) => {
  try {
    const { username, email, password, secretQuestion } = req.body;

    //validations
    if (!username) {
      res.send({ error: "username is required" });
    }

    if (!email) {
      res.send({ error: "email is required" });
    }

    if (!password) {
      res.send({ error: "password is required" });
    }
    if (!secretQuestion) {
      res.send({ error: "Secret Question is required" });
    }

    //checking for existing user

    const userExsist = await userModel.findOne({ email });

    if (userExsist) {
      res.status(200).send({ Message: "User with that email already exists" });
    }

    //register User
    const hashPassword = await Hashpassword(password);
    const user = await new userModel({
      username,
      email,
      password: hashPassword,
      secretQuestion,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in registration ",
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
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        email: user.email,
      },
      token,
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
export const testController = (req, res) => {
  res.send("Protected route");
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, secretQuestion, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!secretQuestion) {
      res.status(400).send({ message: "Secret Question is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New password is required" });
    }
    //checking question and email
    const user = await userModel.findOne({ email, secretQuestion });
    //validations
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong email or answer to secret question",
      });
    }
    const hash = await Hashpassword(newPassword);
    await userModel.findOneAndUpdate(user._id, { password: hash });
    res.status(200).send({
      success: true,
      message: "Password changes successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
