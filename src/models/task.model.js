import mongoose, { Schema, Types } from "mongoose";

const taskScheme = new Schema(
  {
    title: {
      type: String,
      required: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
    },
    remainderTime: {
      type: String,
    },
    file: {
      type: String,
    },
    notes: {
      type: String,
    },
    repeat: {
      type: String,
      enum: ["daily", "weekly", "Weekdays", "Weekly", "Monthly", "Yearly"],
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskScheme);
