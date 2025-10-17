export const LIMITS = {
    MAX_FILE_SIZE: 200 * 1024 * 1024,

    FREE_PLAN: {
        MAX_CONCURRENT_FILES: 3,
        MAX_QUEUE_SIZE: 5,
        RETENTION_TIME: 60 * 60,
        MAX_DAILY_COMPRESSIONS: 10,
    },

    // TODO: Implement PRO_PLAN
    PRO_PLAN: {
        MAX_CONCURRENT_FILES: 10,
        MAX_QUEUE_SIZE: 10,
        RETENTION_TIME: 60 * 60 * 24,
        MAX_DAILY_COMPRESSIONS: 100,
    },

    // TODO: Implement BUSINESS_PLAN
    BUSINESS_PLAN: {
        MAX_CONCURRENT_FILES: 50,
        MAX_QUEUE_SIZE: 100,
        RETENTION_TIME: 60 * 60 * 24 * 7,
        MAX_DAILY_COMPRESSIONS: -1,
    },
} as const;

export const SUPPORTED_FORMATS = {
    VIDEO: ["mp4", "avi", "mkv", "mov", "wmv", "webm", "flv", "m4v", "3gp", "mpg", "mpeg", "m2ts", "mts", "vob", "rm", "rmvb", "divx", "asf"],

    IMAGE: ["jpg", "jpeg", "png", "gif", "webp", "tiff", "tif", "bmp", "svg", "ico", "heic", "heif"],

    AUDIO: ["mp3", "wav", "flac", "aac", "ogg", "m4a", "wma", "aiff", "alac", "ape"],

    EBOOK: ['epub', 'mobi', 'azw3', 'pdf'],

    COMIC: ['cbz', 'cbr', 'cbt', 'cb7'],

    DOCUMENT: ['pdf', 'docx', 'pptx', 'xlsx'],
} as const;

export const ALL_SUPPORTED_EXTENSIONS = [
    ...SUPPORTED_FORMATS.VIDEO,
    ...SUPPORTED_FORMATS.IMAGE,
    ...SUPPORTED_FORMATS.AUDIO,
    ...SUPPORTED_FORMATS.EBOOK,
    ...SUPPORTED_FORMATS.COMIC,
    ...SUPPORTED_FORMATS.DOCUMENT,
] as const;

export const MIME_TYPES = {
    'video/mp4': ['mp4', 'm4v'],
    'video/x-msvideo': ['avi'],
    'video/x-matroska': ['mkv'],
    'video/quicktime': ['mov'],
    'video/webm': ['webm'],
    'video/x-ms-wmv': ['wmv'],
    'video/x-flv': ['flv'],
    'video/3gpp': ['3gp'],
    'video/mpeg': ['mpeg', 'mpg'],

    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'image/tiff': ['tiff', 'tif'],
    'image/bmp': ['bmp'],
    'image/svg+xml': ['svg'],
    'image/x-icon': ['ico'],
    'image/heic': ['heic'],
    'image/heif': ['heif'],

    'audio/mpeg': ['mp3'],
    'audio/wav': ['wav'],
    'audio/flac': ['flac'],
    'audio/aac': ['aac'],
    'audio/ogg': ['ogg'],
    'audio/x-m4a': ['m4a'],
    'audio/x-ms-wma': ['wma'],

    'application/pdf': ['pdf'],
    'application/epub+zip': ['epub'],
    'application/x-mobipocket-ebook': ['mobi'],
    'application/vnd.amazon.ebook': ['azw3'],

    'application/vnd.comicbook+zip': ['cbz'],
    'application/x-cbr': ['cbr'],
    'application/x-cbt': ['cbt'],
    'application/x-cb7': ['cb7'],

    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
} as const;

export const VIDEO_QUALITY = {
    BEST_QUALITY: {
        id: 'best_quality',
        label: 'Melhor qualidade',
        videoBitrate: 'original',
        audioBitrate: '192',
        codec: 'h264',
        preset: 'slow',
        crf: '18',
        description: 'Mínima perda de qualidade, arquivo maior',
    },
    GOOD_QUALITY: {
        id: 'good_quality',
        label: 'Boa qualidade',
        videoBitrate: '2500k',
        audioBitrate: '128',
        codec: 'h264',
        preset: 'medium',
        crf: '23',
        description: 'Equilíbrio entre qualidade e tamanho',
    },
    DEFAULT: {
        id: 'default',
        label: 'Qualidade padrão',
        videoBitrate: '1500k',
        audioBitrate: '96',
        codec: 'h264',
        preset: 'medium',
        crf: '28',
        description: 'Boa escolha para a maioria dos casos',
    },
    GOOD_COMPRESSION: {
        id: 'good_compression',
        label: 'Boa compressão',
        videoBitrate: '800k',
        audioBitrate: '64',
        codec: 'h264',
        preset: 'fast',
        crf: '32',
        description: 'Tamanho menor, qualidade aceitável',
    },
    BEST_COMPRESSION: {
        id: 'best_compression',
        label: 'Melhor compressão',
        videoBitrate: '500k',
        audioBitrate: '48',
        codec: 'h264',
        preset: 'veryfast',
        crf: '35',
        description: 'Tamanho mínimo, qualidade reduzida',
    }
} as const;

export const IMAGE_QUALITY = {
    BEST_QUALITY: {
        id: 'best_quality',
        label: 'Melhor qualidade',
        quality: 95,
        progressive: true,
        strip: false,
        description: 'Perda mínima de qualidade',
    },
    GOOD_QUALITY: {
        id: 'good_quality',
        label: 'Boa qualidade',
        quality: 85,
        progressive: true,
        strip: true,
        description: 'Muito boa qualidade visual',
    },
    DEFAULT: {
        id: 'default',
        label: 'Qualidade padrão',
        quality: 75,
        progressive: true,
        strip: true,
        description: 'Boa para web e compartilhamento',
    },
    GOOD_COMPRESSION: {
        id: 'good_compression',
        label: 'Boa compressão',
        quality: 65,
        progressive: true,
        strip: true,
        description: 'Menor tamanho, qualidade OK',
    },
    BEST_COMPRESSION: {
        id: 'best_compression',
        label: 'Melhor compressão',
        quality: 50,
        progressive: false,
        strip: true,
        description: 'Compressão máxima',
    },
} as const;

export const AUDIO_QUALITY = {
  BEST_QUALITY: {
    id: 'best_quality',
    label: 'Melhor Qualidade',
    bitrate: 320,
    sampleRate: 48000,
    channels: 2,
    description: 'Qualidade audiófila',
  },
  GOOD_QUALITY: {
    id: 'good_quality',
    label: 'Boa Qualidade',
    bitrate: 192,
    sampleRate: 44100,
    channels: 2,
    description: 'Alta qualidade',
  },
  DEFAULT: {
    id: 'default',
    label: 'Qualidade Padrão',
    bitrate: 128,
    sampleRate: 44100,
    channels: 2,
    description: 'Padrão MP3',
  },
  GOOD_COMPRESSION: {
    id: 'good_compression',
    label: 'Boa Compressão',
    bitrate: 96,
    sampleRate: 44100,
    channels: 2,
    description: 'Podcasts e voz',
  },
  BEST_COMPRESSION: {
    id: 'best_compression',
    label: 'Melhor Compressão',
    bitrate: 64,
    sampleRate: 22050,
    channels: 1,
    description: 'Tamanho mínimo',
  },
} as const;

export const COMIC_QUALITY = {
  BEST_QUALITY: {
    id: 'best_quality',
    label: 'Melhor Qualidade',
    imageQuality: 95,
    format: 'jpg',
    resize: 100,
    description: 'Sem perda perceptível',
  },
  GOOD_QUALITY: {
    id: 'good_quality',
    label: 'Boa Qualidade',
    imageQuality: 85,
    format: 'jpg',
    resize: 100,
    description: 'Ótima para leitura',
  },
  DEFAULT: {
    id: 'default',
    label: 'Qualidade Padrão',
    imageQuality: 75,
    format: 'jpg',
    resize: 90,
    description: 'Boa para maioria dos dispositivos',
  },
  GOOD_COMPRESSION: {
    id: 'good_compression',
    label: 'Boa Compressão',
    imageQuality: 65,
    format: 'webp',
    resize: 80,
    description: 'Menor tamanho, boa qualidade',
  },
  BEST_COMPRESSION: {
    id: 'best_compression',
    label: 'Melhor Compressão',
    imageQuality: 50,
    format: 'webp',
    resize: 70,
    description: 'Tamanho mínimo',
  },
} as const;

export const EBOOK_QUALITY = {
  DEFAULT: {
    id: 'default',
    label: 'Compressão Padrão',
    imageQuality: 80,
    minifyHtml: true,
    minifyCss: true,
    compressImages: true,
    description: 'Reduz tamanho mantendo legibilidade',
  },
  AGGRESSIVE: {
    id: 'aggressive',
    label: 'Compressão Agressiva',
    imageQuality: 60,
    minifyHtml: true,
    minifyCss: true,
    compressImages: true,
    removeUnusedCss: true,
    description: 'Máxima redução de tamanho',
  },
} as const;

export const RETENTION = {
  FREE: 60 * 60,
  PRO: 24 * 60 * 60,
  BUSINESS: 7 * 24 * 60 * 60,
} as const;

export const PROCESSING = {
  JOB_TIMEOUT: 10 * 60 * 1000,
  MAX_RETRIES: 3,
  PROGRESS_INTERVAL: 1000,
  STREAM_CHUNK_SIZE: 64 * 1024,
  WORKER_CONCURRENCY: 4,
} as const;

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: `Arquivo muito grande. Tamanho máximo: ${LIMITS.MAX_FILE_SIZE / (1024 * 1024)}MB`,
  UNSUPPORTED_FORMAT: 'Formato de arquivo não suportado',
  TOO_MANY_FILES: `Você pode processar no máximo ${LIMITS.FREE_PLAN.MAX_CONCURRENT_FILES} arquivos simultaneamente no plano free`,
  QUEUE_FULL: 'Fila de processamento cheia. Tente novamente em alguns minutos',
  PROCESSING_FAILED: 'Falha ao processar arquivo',
  FILE_NOT_FOUND: 'Arquivo não encontrado',
  FILE_EXPIRED: 'Arquivo expirado e foi removido do servidor',
  INVALID_OPTIONS: 'Opções de compressão inválidas',
} as const;

export function isSupportedExtension(extension: string): boolean {
  const ext = extension.toLowerCase().replace('.', '');
  return ALL_SUPPORTED_EXTENSIONS.includes(ext as any);
}

export function getFileType(extension: string): keyof typeof SUPPORTED_FORMATS | null {
  const ext = extension.toLowerCase().replace('.', '');

  for (const [type, extensions] of Object.entries(SUPPORTED_FORMATS)) {
    if (extensions.includes(ext as any)) {
      return type as keyof typeof SUPPORTED_FORMATS;
    }
  }

  return null;
}

export function getQualityOptions(fileType: keyof typeof SUPPORTED_FORMATS) {
  switch (fileType) {
    case 'VIDEO':
      return VIDEO_QUALITY;
    case 'IMAGE':
      return IMAGE_QUALITY;
    case 'AUDIO':
      return AUDIO_QUALITY;
    case 'COMIC':
      return COMIC_QUALITY;
    case 'EBOOK':
      return EBOOK_QUALITY;
    default:
      return null;
  }
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function calculateCompressionRatio(originalSize: number, compressedSize: number): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}
