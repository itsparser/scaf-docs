import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      uid: { type: String, required: true },
      email: { type: String, required: true },
      displayName: { type: String },
    },
    status: {
      type: String,
      enum: ["draft", "published", "discarded"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export const Template =
  mongoose.models.Template || mongoose.model("Template", templateSchema);
