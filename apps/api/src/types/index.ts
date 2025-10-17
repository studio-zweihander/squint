export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    id: string;
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta?: {
    timestamp: string;
  };
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: {
    timestamp: string;
    pagination: PaginationMeta;
  };
}
