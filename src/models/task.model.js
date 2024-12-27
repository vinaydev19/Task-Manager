import mongoose, { Schema, Types } from "mongoose";

const taskScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    reminderDate: {
      type: Date,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskScheme);
