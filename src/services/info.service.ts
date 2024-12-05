import { Info, IInfo } from "@/lib/models/info";
import connectDB from "@/lib/mongodb";

export interface CreateInfoDTO {
  $schema?: string;
  version: string;
  name: string;
  description: string;
  author: string;
  language: string;
  tags: string[];
  args: Array<{
    name: string;
    default: string;
  }>;
  extends: Array<{
    template_id: string;
    version: string;
    args: Array<{
      name: string;
      default: string;
    }>;
  }>;
  steps: Array<{
    id: string;
    description: string;
    path?: string;
    type: string;
    content: string;
  }>;
  createdBy: {
    uid: string;
    email: string;
    displayName?: string;
  };
  status?: "draft" | "published" | "archived";
}

export interface GetInfosOptions {
  page?: number;
  limit?: number;
  search?: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  language?: string;
  author?: string;
  createdBy?: string;
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

export class InfoService {
  //   static async createInfo(data: CreateInfoDTO): Promise<IInfo> {
  //     await connectDB();
  //     return Info.create(data);
  //   }

  //   static async getInfos(options: GetInfosOptions = {}): Promise<PaginatedResponse<IInfo>> {
  //     await connectDB();

  //     const page = Math.max(1, options.page || 1);
  //     const limit = Math.min(50, Math.max(1, options.limit || 10));
  //     const skip = (page - 1) * limit;

  //     // Build query
  //     const query: any = {};

  //     if (options.search) {
  //       query.$or = [
  //         { name: { $regex: options.search, $options: 'i' } },
  //         { description: { $regex: options.search, $options: 'i' } },
  //       ];
  //     }

  //     if (options.tags?.length) {
  //       query.tags = { $all: options.tags };
  //     }

  //     if (options.status) {
  //       query.status = options.status;
  //     }

  //     if (options.language) {
  //       query.language = options.language;
  //     }

  //     if (options.author) {
  //       query.author = options.author;
  //     }

  //     if (options.createdBy) {
  //       query['createdBy.uid'] = options.createdBy;
  //     }

  //     // Execute query with pagination
  //     const [infos, total] = await Promise.all([
  //       Info.find(query)
  //         .sort({ createdAt: -1 })
  //         .skip(skip)
  //         .limit(limit)
  //         .populate('templateRefs')
  //         .lean(),
  //       Info.countDocuments(query)
  //     ]);

  //     return {
  //       data: infos,
  //       pagination: {
  //         total,
  //         page,
  //         limit,
  //         totalPages: Math.ceil(total / limit)
  //       }
  //     };
  //   }

  static async getInfoById(id: string): Promise<IInfo | null> {
    await connectDB();
    const info = await Info.findById(id).populate("templateRefs").lean();
    return info as IInfo | null;
  }

  static async updateInfo(
    id: string,
    data: Partial<CreateInfoDTO>
  ): Promise<IInfo | null> {
    await connectDB();
    const info = await Info.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    )
      .populate("templateRefs")
      .lean();
    return info as IInfo | null;
  }

  //   static async deleteInfo(id: string): Promise<boolean> {
  //     await connectDB();
  //     const result = await Info.findByIdAndDelete(id);
  //     return !!result;
  //   }

  //   static async updateStatus(id: string, status: "draft" | "published" | "archived"): Promise<IInfo | null> {
  //     await connectDB();
  //     return Info.findByIdAndUpdate(
  //       id,
  //       { status, updatedAt: new Date() },
  //       { new: true }
  //     )
  //       .populate('templateRefs')
  //       .lean();
  //   }

  //   static async getByTags(tags: string[]): Promise<IInfo[]> {
  //     await connectDB();
  //     return Info.find({ tags: { $all: tags }, status: "published" })
  //       .sort({ createdAt: -1 })
  //       .populate('templateRefs')
  //       .lean();
  //   }

  //   static async getByLanguage(language: string): Promise<IInfo[]> {
  //     await connectDB();
  //     return Info.find({ language, status: "published" })
  //       .sort({ createdAt: -1 })
  //       .populate('templateRefs')
  //       .lean();
  //   }

  //   static async searchByContent(searchTerm: string): Promise<IInfo[]> {
  //     await connectDB();
  //     return Info.find({
  //       $or: [
  //         { name: { $regex: searchTerm, $options: 'i' } },
  //         { description: { $regex: searchTerm, $options: 'i' } },
  //         { 'steps.content': { $regex: searchTerm, $options: 'i' } },
  //       ],
  //       status: "published"
  //     })
  //       .sort({ createdAt: -1 })
  //       .populate('templateRefs')
  //       .lean();
  //   }
}
