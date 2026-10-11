/**
 * Client-side high performance image compressor and validator.
 * Converts uploaded images to optimized, lightweight base64 Data URLs (WebP/JPEG)
 * that are permanently stored in Firestore, eliminating the need for external storage buckets
 * and preventing any broken links or ephemeral disk wiping across environments.
 */

export interface CompressionResult {
  dataUrl: string;
  sizeKb: number;
  width: number;
  height: number;
  format: string;
}

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressionResult> {
  const { maxWidth = 1280, maxHeight = 1280, quality = 0.82 } = options;

  // Handle SVGs directly without rasterizing
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const sizeKb = Math.round((dataUrl.length * 0.75) / 1024);
        resolve({
          dataUrl,
          sizeKb,
          width: 0,
          height: 0,
          format: 'svg'
        });
      };
      reader.onerror = () => reject(new Error('Failed to read SVG file'));
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Calculate constrained dimensions
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      // Draw onto offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context not available'));
        return;
      }

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Attempt WebP first, fallback to JPEG
      let format = 'image/webp';
      let dataUrl = canvas.toDataURL(format, quality);

      // Fallback check (some older webviews output PNG for unsupported webp)
      if (!dataUrl.startsWith('data:image/webp')) {
        format = 'image/jpeg';
        dataUrl = canvas.toDataURL(format, quality);
      }

      // Approximate size in KB: base64 string length * 0.75
      const sizeKb = Math.round((dataUrl.length * 0.75) / 1024);

      resolve({
        dataUrl,
        sizeKb,
        width,
        height,
        format: format.replace('image/', '')
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for processing'));
    };

    img.src = objectUrl;
  });
}

export function isValidImageUrl(str: string): boolean {
  if (!str) return false;
  if (str.startsWith('data:image/')) return true;
  if (str.startsWith('http://') || str.startsWith('https://')) return true;
  if (str.startsWith('/')) return true;
  return false;
}
