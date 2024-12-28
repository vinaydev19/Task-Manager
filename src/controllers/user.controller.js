import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async function (req, resp) {
  // step 1 :- get data from user or frontend
  const { username, email, password } = req.body;

  // step 2 :- validate the data
  if ([username, email, password].some((field) => field.trim() === "")) {
    return resp.status(400).json({
      status: 400,
      message: "all field is required",
    });
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(email)) {
    return resp.status(400).json({
      status: 400,
      message: "Email is invalid",
    });
  }

  // step 3 :- check the user exists or not
  const findTheUser = User.findOne({
    $or: [{ email }, { username }],
  });

  if (!findTheUser) {
    return resp.status(400).json({
      status: 400,
      message: "User already exists on this username or email",
    });
  }

  const user = User.create({
    email,
    username: username.toLowerCase(),
    password,
  });

  const createdUser = User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return resp.status(400).json({
      status: 400,
      message: "something want wrong while registering the user",
    });
  }

  return resp.status(200).json({
    status: 200,
    data: createdUser,
    message: "user registered successfull",
  });
};
