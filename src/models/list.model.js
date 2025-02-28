import mongoose, { Schema } from "mongoose";

const listScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


export const List = mongoose.model("List", listScheme);
