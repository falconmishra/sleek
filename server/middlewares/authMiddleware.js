import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//token based routes protected routes

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.cookie.token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await userModel.findOne({ token });

    if (user.role === 1) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in isAdmin middleware",
    });
  }
};

export const validateCookie = (req, res, next) => {
  const cookie = req.cookies.token;
  if (cookie) {
    try {
      const decode = JWT.verify(cookie, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      console.log("error", error);
    }
  } else {
    res.send({ msg: "no cookies was sent" });
  }
};
