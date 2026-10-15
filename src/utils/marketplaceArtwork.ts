export type ArtworkPlacement = {
  // Fraction of the allotted sponsor zone, not a physical print size.
  scale: number;
  x: number;
  y: number;
  rotation: number;
};

export const defaultArtworkPlacement: ArtworkPlacement = {
  scale: 0.8,
  x: 0,
  y: 0,
  rotation: 0,
};

export function artworkGeometry(
  imageWidth: number,
  imageHeight: number,
  surfaceAspect: number,
  placement: ArtworkPlacement,
  canvasSize = 1024,
) {
  // Compensate for the physical aspect ratio before mapping onto the mesh UVs.
  const safeAspect = Number.isFinite(surfaceAspect) && surfaceAspect > 0 ? surfaceAspect : 1;
  const imageAspect = Math.max(0.0001, imageWidth / Math.max(1, imageHeight));
  const uvAspect = imageAspect / safeAspect;
  const scale = Math.min(1.1, Math.max(0.3, placement.scale));
  const limit = canvasSize * 0.88 * scale;
  let width = Math.min(limit, limit * uvAspect);
  let height = width / uvAspect;
  const radians = (placement.rotation * Math.PI) / 180;
  const cosine = Math.abs(Math.cos(radians));
  const sine = Math.abs(Math.sin(radians));
  const correction = Math.min(
    1,
    limit / (width * cosine + height * sine),
    limit / (width * sine + height * cosine),
  );
  width *= correction;
  height *= correction;
  const boundsWidth = width * cosine + height * sine;
  const boundsHeight = width * sine + height * cosine;
  const x = canvasSize / 2 + (Math.max(-100, Math.min(100, placement.x)) / 100) * ((canvasSize - boundsWidth) / 2);
  const y = canvasSize / 2 + (Math.max(-100, Math.min(100, placement.y)) / 100) * ((canvasSize - boundsHeight) / 2);
  return { width, height, x, y, radians };
}

export function renderArtworkCanvas(
  url: string,
  surfaceAspect: number,
  placement: ArtworkPlacement,
  size = 1024,
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      if (!context || !image.naturalWidth || !image.naturalHeight) {
        reject(new Error('Unable to read artwork'));
        return;
      }
      const geometry = artworkGeometry(image.naturalWidth, image.naturalHeight, surfaceAspect, placement, size);
      context.clearRect(0, 0, size, size);
      context.translate(geometry.x, geometry.y);
      context.rotate(geometry.radians);
      context.drawImage(image, -geometry.width / 2, -geometry.height / 2, geometry.width, geometry.height);
      resolve(canvas);
    };
    image.onerror = () => reject(new Error('Unable to load artwork'));
    image.src = url;
  });
}
