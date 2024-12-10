export interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: Date;
  downloads?: number;
}

export interface TemplateFilters {
  search: string;
  tags: string[];
  showPrivate: boolean;
}
