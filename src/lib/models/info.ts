import mongoose from "mongoose";

// Sub-schemas
const ArgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  default: { type: String, required: true },
});

const ExtendSchema = new mongoose.Schema({
  template_id: { type: String, required: true },
  version: { type: String, required: true },
  args: [ArgSchema],
});

const StepSchema = new mongoose.Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String }, // Optional as it's not required in all steps
  type: { type: String, required: true },
  content: { type: String, required: true },
});

// Main schema
const infoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      default: "latest",
    },
    language: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (v: string[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Tags array must not be empty",
      },
    },
    args: {
      type: [ArgSchema],
      required: true,
      default: [],
    },
    extends: {
      type: [ExtendSchema],
      required: true,
      default: [],
    },
    steps: {
      type: [StepSchema],
      required: true,
      validate: {
        validator: function (v: any[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Steps array must not be empty",
      },
    },
    createdBy: {
      uid: { type: String, required: true },
      email: { type: String, required: true },
      displayName: { type: String },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
infoSchema.index({ name: 1 });
infoSchema.index({ tags: 1 });
infoSchema.index({ "createdBy.uid": 1 });
infoSchema.index({ status: 1 });
infoSchema.index({ createdAt: -1 });

// Virtual for template references
infoSchema.virtual("templateRefs", {
  ref: "Template",
  localField: "extends.template_id",
  foreignField: "_id",
});

// Export types
export interface IArg {
  name: string;
  default: string;
}

export interface IExtend {
  template_id: string;
  version: string;
  args: IArg[];
}

export interface IStep {
  id: string;
  description: string;
  path?: string;
  type: string;
  content: string;
}

export interface IInfo extends mongoose.Document {
  $schema: string;
  version: string;
  name: string;
  description: string;
  author: string;
  language: string;
  tags: string[];
  args: IArg[];
  extends: IExtend[];
  steps: IStep[];
  createdBy: {
    uid: string;
    email: string;
    displayName?: string;
  };
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export const Info =
  mongoose.models.Info || mongoose.model<IInfo>("Info", infoSchema);
