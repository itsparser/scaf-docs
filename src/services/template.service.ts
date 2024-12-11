import { Template } from "@/lib/models/template";
import connectDB from "@/lib/mongodb";

export interface CreateTemplateDTO {
  _id: string;
  name: string;
  description?: string;
  createdBy: {
    uid: string;
    email: string;
    displayName?: string;
  };
}

export interface GetTemplatesOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class TemplateService {
  static async createTemplate(data: CreateTemplateDTO) {
    await connectDB();
    return Template.create(data);
  }

  static async getTemplates(options: GetTemplatesOptions = {}) {
    await connectDB();

    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (options.search) {
      query.$or = [
        { name: { $regex: options.search, $options: "i" } },
        { description: { $regex: options.search, $options: "i" } },
      ];
    }

    // Execute query with pagination
    const [templates, total] = await Promise.all([
      Template.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Template.countDocuments(query),
    ]);

    return {
      data: templates,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getTemplateById(id: string) {
    await connectDB();
    return Template.findById(id);
  }

  static async updateTemplate(id: string, data: Partial<CreateTemplateDTO>) {
    await connectDB();
    return Template.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  static async deleteTemplate(id: string) {
    await connectDB();
    return Template.findByIdAndDelete(id);
  }
}
