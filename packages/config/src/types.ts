import type { SUPPORTED_FORMATS, VIDEO_QUALITY, IMAGE_QUALITY, AUDIO_QUALITY, COMIC_QUALITY, EBOOK_QUALITY } from './constants';

export type FileType = keyof typeof SUPPORTED_FORMATS;
export type SupportedExtension = (typeof SUPPORTED_FORMATS)[FileType][number];

export type VideoQualityId = keyof typeof VIDEO_QUALITY;
export type ImageQualityId = keyof typeof IMAGE_QUALITY;
export type AudioQualityId = keyof typeof AUDIO_QUALITY;
export type ComicQualityId = keyof typeof COMIC_QUALITY;
export type EbookQualityId = keyof typeof EBOOK_QUALITY;

export type PlanType = 'FREE' | 'PRO' | 'BUSINESS';

export interface PlanLimits {
    MAX_CONCURRENT_FILES: number;
    MAX_QUEUE_SIZE: number;
    RETENTION_TIME: number;
    MAX_DAILY_COMPRESSIONS: number;
}

export interface UploadedFile {
  id: string;
  originalName: string;
  fileName: string;
  path: string;
  size: number;
  mimeType: string;
  extension: string;
  type: FileType;
  uploadedAt: Date;
  expiresAt: Date;
}

export interface VideoCompressionOptions {
  quality: VideoQualityId;
  codec?: 'h264' | 'h265' | 'vp9';
  resolution?: {
    width?: number;
    height?: number;
  };
  customBitrate?: string;
  customAudioBitrate?: number;
}

export interface ImageCompressionOptions {
  quality: ImageQualityId;
  format?: 'jpg' | 'png' | 'webp';
  resize?: {
    width?: number;
    height?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  };
  customQuality?: number;
}

export interface AudioCompressionOptions {
  quality: AudioQualityId;
  format?: 'mp3' | 'aac' | 'ogg';
  customBitrate?: number;
}

export interface ComicCompressionOptions {
  quality: ComicQualityId;
  format?: 'jpg' | 'webp' | 'png';
  resize?: number;
}

export interface EbookCompressionOptions {
  quality: EbookQualityId;
  compressImages?: boolean;
  minifyHtml?: boolean;
  minifyCss?: boolean;
}

export type CompressionOptions =
  | VideoCompressionOptions
  | ImageCompressionOptions
  | AudioCompressionOptions
  | ComicCompressionOptions
  | EbookCompressionOptions;

export type JobStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface CompressionJob {
  id: string;
  fileId: string;
  userId?: string;
  status: JobStatus;
  progress: number;
  options: CompressionOptions;
  originalSize: number;
  compressedSize?: number;
  compressionRatio?: number;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  resultPath?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressUpdate {
  jobId: string;
  progress: number;
  status: JobStatus;
  message?: string;
  estimatedTimeRemaining?: number;
}

export interface CompressionResult {
  success: boolean;
  jobId: string;
  originalFile: {
    name: string;
    size: number;
  };
  compressedFile?: {
    name: string;
    size: number;
    path: string;
    downloadUrl: string;
  };
  compressionRatio?: number;
  processingTime?: number;
  error?: string;
}

export interface UploadRequest {
  files: File[];
  plan?: PlanType;
  userId?: string;
}

export interface UploadResponse {
  success: boolean;
  files: UploadedFile[];
  errors?: Array<{
    fileName: string;
    error: string;
  }>;
}

export interface CompressionRequest {
  fileId: string;
  options: CompressionOptions;
  userId?: string;
}

export interface CompressionResponse {
  success: boolean;
  jobId: string;
  message: string;
}

export interface BatchCompressionRequest {
  files: Array<{
    fileId: string;
    options: CompressionOptions;
  }>;
  userId?: string;
}

export interface BatchCompressionResponse {
  success: boolean;
  jobs: Array<{
    fileId: string;
    jobId: string;
    status: JobStatus;
  }>;
  errors?: Array<{
    fileId: string;
    error: string;
  }>;
}

export interface UserStats {
  userId: string;
  plan: PlanType;
  totalCompressions: number;
  totalSizeSaved: number;
  dailyCompressions: number;
  monthlyCompressions: number;
  activeJobs: number;
  queuedJobs: number;
}

export interface SystemStats {
  totalUsers: number;
  totalCompressions: number;
  totalSizeSaved: number;
  activeJobs: number;
  queuedJobs: number;
  averageCompressionRatio: number;
  popularFormats: Array<{
    type: FileType;
    count: number;
  }>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
  };
}

export interface WebhookPayload {
  event: 'compression.completed' | 'compression.failed' | 'file.expired';
  jobId: string;
  fileId: string;
  userId?: string;
  data: CompressionResult | { error: string };
  timestamp: string;
}

export interface UserPreferences {
  defaultQuality?: {
    video?: VideoQualityId;
    image?: ImageQualityId;
    audio?: AudioQualityId;
    comic?: ComicQualityId;
    ebook?: EbookQualityId;
  };
  notifications?: {
    email?: boolean;
    webhook?: {
      enabled: boolean;
      url?: string;
    };
  };
  autoDelete?: boolean;
}

export interface FileMetadata {
  duration?: number;
  width?: number;
  height?: number;
  bitrate?: number;
  codec?: string;
  fps?: number;
  channels?: number;
  sampleRate?: number;
  pages?: number;
}

export interface CleanupJob {
  id: string;
  type: 'expired_files' | 'failed_jobs' | 'old_logs';
  scheduledAt: Date;
  executedAt?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  itemsProcessed?: number;
  error?: string;
}
