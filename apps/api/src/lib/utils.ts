import { getFileType, isSupportedExtension } from '@squint/config';

export function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 255);
}

export function generateFileId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getFileExtension(fileName: string): string {
  const match = fileName.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
}

export function validateFileType(fileName: string): { valid: boolean; type?: string; error?: string } {
  const extension = getFileExtension(fileName);

  if (!extension) {
    return { valid: false, error: 'Arquivo sem extensão' };
  }

  if (!isSupportedExtension(extension)) {
    return { valid: false, error: `Formato .${extension} não suportado` };
  }

  const fileType = getFileType(extension);

  if (!fileType) {
    return { valid: false, error: 'Tipo de arquivo não identificado' };
  }

  return { valid: true, type: fileType };
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function generateErrorId(): string {
  return `ERR-${Date.now()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}
