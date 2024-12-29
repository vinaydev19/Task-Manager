import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(`error on generate AccessToken and refreshToken`);
    throw error;
  }
};

const registerUser = async function (req, resp) {
  try {
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
    const findTheUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (findTheUser) {
      return resp.status(400).json({
        status: 400,
        message: "User already exists on this username or email",
      });
    }

    const user = await User.create({
      email,
      username: username.toLowerCase(),
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

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
  } catch (error) {
    console.log(
      `error while register controller of user in || user.controller.js`
    );
    throw error;
  }
};

const loginUser = async function (req, resp) {
  try {
    // get data from frontend or user
    const { email, username, password } = req.body;

    // validate the data
    if (!email && !username ) {
      return resp.status(400).json({
        status: 400,
        message: "all field are required",
      });
    }


    // find the user in db

    const user = await User.findOne({
      $or: [{ email, username }],
    });

    if (!user) {
      return resp.status(400).json({
        status: 400,
        message: "user does not exists",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return resp.status(400).json({
        status: 400,
        message: "password is incorrect",
      });
    }

    // generate access and refresh token

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return resp
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        status: 200,
        data: { user: loggedInUser, accessToken, refreshToken },
        message: "login user successfull",
      });
  } catch (error) {
    console.log(
      `error while login controller of user in || user.controller.js`
    );
    throw error;
  }
};

const logoutUser = async function (req, resp) {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return resp
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      status: 200,
      data: {},
      message: "user logout successfull",
    });
};

export { registerUser, loginUser, logoutUser };
