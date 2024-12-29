import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyJWT = async (req, resp, next) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("bearer ", "");

    if (!token) {
      return resp.status(401).json({
        status: 401,
        message: "unauthorized request",
      });
    }

    const decodedToken =  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return resp.status(400).json({
        status: 400,
        message: "invalid access token",
      });
    }

    req.user = user;

    next()
  } catch (error) {
    console.log("invalid access token", error);
    throw error;
  }
};
