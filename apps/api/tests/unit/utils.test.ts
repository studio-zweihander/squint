import { describe, it, expect } from 'bun:test';
import {
  sanitizeFileName,
  generateFileId,
  getFileExtension,
  validateFileType,
  formatBytes,
  generateErrorId,
} from '../../src/lib/utils';

describe('Utils - File Operations', () => {
  describe('sanitizeFileName', () => {
    it('deve converter para minúsculas', () => {
      const result = sanitizeFileName('MyFile.PDF');
      expect(result).toBe('myfile.pdf');
    });

    it('deve remover caracteres especiais', () => {
      const result = sanitizeFileName('file@#$%name.jpg');
      expect(result).toBe('file-name.jpg');
    });

    it('deve remover múltiplos hífens consecutivos', () => {
      const result = sanitizeFileName('file----name.jpg');
      expect(result).toBe('file-name.jpg');
    });

    it('deve remover hífens do início e fim', () => {
      const result = sanitizeFileName('-file-name-.jpg');
      expect(result).toBe('file-name.jpg');
    });

    it('deve limitar tamanho a 255 caracteres', () => {
      const longName = 'a'.repeat(300) + '.jpg';
      const result = sanitizeFileName(longName);
      expect(result.length).toBeLessThanOrEqual(255);
    });
  });

  describe('generateFileId', () => {
    it('deve gerar ID único a cada chamada', () => {
      const id1 = generateFileId();
      const id2 = generateFileId();
      expect(id1).not.toBe(id2);
    });

    it('deve gerar ID com formato correto', () => {
      const id = generateFileId();
      expect(id).toMatch(/^\d+-[a-z0-9]+$/);
    });
  });

  describe('getFileExtension', () => {
    it('deve extrair extensão do arquivo', () => {
      const ext = getFileExtension('document.pdf');
      expect(ext).toBe('pdf');
    });

    it('deve converter extensão para minúsculas', () => {
      const ext = getFileExtension('image.JPG');
      expect(ext).toBe('jpg');
    });

    it('deve retornar string vazia para arquivo sem extensão', () => {
      const ext = getFileExtension('noextension');
      expect(ext).toBe('');
    });

    it('deve lidar com múltiplos pontos', () => {
      const ext = getFileExtension('archive.tar.gz');
      expect(ext).toBe('gz');
    });
  });

  describe('validateFileType', () => {
    it('deve validar tipo de arquivo suportado', () => {
      const result = validateFileType('photo.jpg');
      expect(result.valid).toBe(true);
      expect(result.type).toBe('IMAGE');
    });

    it('deve rejeitar arquivo sem extensão', () => {
      const result = validateFileType('noextension');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('sem extensão');
    });

    it('deve rejeitar formato não suportado', () => {
      const result = validateFileType('file.xyz');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('não suportado');
    });

    it('deve validar diferentes tipos de arquivo', () => {
      const video = validateFileType('movie.mp4');
      const audio = validateFileType('song.mp3');
      const doc = validateFileType('book.epub');

      expect(video.valid).toBe(true);
      expect(video.type).toBe('VIDEO');
      expect(audio.valid).toBe(true);
      expect(audio.type).toBe('AUDIO');
      expect(doc.valid).toBe(true);
      expect(doc.type).toBe('EBOOK');
    });
  });

  describe('formatBytes', () => {
    it('deve formatar 0 bytes', () => {
      const result = formatBytes(0);
      expect(result).toBe('0 Bytes');
    });

    it('deve formatar bytes', () => {
      const result = formatBytes(512);
      expect(result).toContain('Bytes');
    });

    it('deve formatar kilobytes', () => {
      const result = formatBytes(2048);
      expect(result).toContain('KB');
    });

    it('deve formatar megabytes', () => {
      const result = formatBytes(2097152);
      expect(result).toContain('MB');
    });

    it('deve formatar gigabytes', () => {
      const result = formatBytes(2147483648);
      expect(result).toContain('GB');
    });

    it('deve respeitar casas decimais', () => {
      const result = formatBytes(1536, 2);
      expect(result).toMatch(/1\.\d{1,2} KB/);
    });
  });

  describe('generateErrorId', () => {
    it('deve gerar ID de erro único', () => {
      const id1 = generateErrorId();
      const id2 = generateErrorId();
      expect(id1).not.toBe(id2);
    });

    it('deve gerar ID com prefixo ERR', () => {
      const id = generateErrorId();
      expect(id).toMatch(/^ERR-/);
    });

    it('deve gerar ID com formato válido', () => {
      const id = generateErrorId();
      expect(id).toMatch(/^ERR-\d+-[A-Z0-9]+$/);
    });
  });
});
