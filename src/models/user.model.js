import mongoose, { Schema } from "mongoose";

const userScheme = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userScheme);
