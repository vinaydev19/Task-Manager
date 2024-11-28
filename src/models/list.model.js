import mongoose, { Schema } from "mongoose";

const listScheme = new Schema({
  name: {
    type: String,
    required: String,
  },
  type: {
    type: String,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const List = mongoose.model("List", listScheme);
