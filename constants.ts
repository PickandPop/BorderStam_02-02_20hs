import { OptionItem, TagColor, TagPattern, TagShape, TagSize } from './types';

export const SHAPE_OPTIONS: OptionItem<TagShape>[] = [
  { value: TagShape.BONE, label: 'Hueso' },
  { value: TagShape.HEART, label: 'Corazón' },
  { value: TagShape.CIRCLE, label: 'Círculo' },
];

export const COLOR_OPTIONS: OptionItem<TagColor>[] = [
  { value: TagColor.PINK, label: 'Rosa' },
  { value: TagColor.WHITE, label: 'Blanco' },
  { value: TagColor.BLUE, label: 'Azul' },
];

export const PATTERN_OPTIONS: OptionItem<TagPattern>[] = [
  { value: TagPattern.SOLID, label: 'Liso' },
  { value: TagPattern.DOTS, label: 'Puntitos' },
  { value: TagPattern.STRIPES, label: 'Rayado' },
];

export const SIZE_OPTIONS: OptionItem<TagSize>[] = [
  { value: TagSize.S, label: 'S' },
  { value: TagSize.M, label: 'M' },
  { value: TagSize.L, label: 'L' },
];

// Mapping for UI display colors (swatches)
export const COLOR_MAP: Record<TagColor, string> = {
  [TagColor.PINK]: '#FFC0CB',
  [TagColor.WHITE]: '#FFFFFF',
  [TagColor.BLUE]: '#87CEEB', // Updated to Sky Blue (Celeste) to match product photos
};

// Scale factors for visualizer
export const SCALE_MAP: Record<TagSize, number> = {
  [TagSize.S]: 0.8,
  [TagSize.M]: 1.0,
  [TagSize.L]: 1.2,
};

// Prices based on size (Example currency)
export const PRICE_MAP: Record<TagSize, number> = {
  [TagSize.S]: 1200,
  [TagSize.M]: 1500,
  [TagSize.L]: 1800,
};

// --- FILE NAMING LOGIC ---

// Mapping internal values to the specific Spanish filenames provided by the user
// Convention: forma_color_estilo (e.g., huesito_celeste_rayado)
export const FILENAME_PARTS = {
  shape: {
    [TagShape.BONE]: 'huesito',
    [TagShape.HEART]: 'corazon',
    [TagShape.CIRCLE]: 'circulo',
  },
  color: {
    [TagColor.PINK]: 'rosa',
    [TagColor.WHITE]: 'blanco',
    [TagColor.BLUE]: 'celeste', // User specified 'celeste' for blue
  },
  pattern: {
    [TagPattern.SOLID]: 'liso',
    [TagPattern.DOTS]: 'puntitos',
    [TagPattern.STRIPES]: 'rayado',
  }
};

/**
 * Generates the image path based on the selected configuration.
 * Returns a string like: img/huesito_celeste_rayado.png
 */
export const generateTagImageUrl = (config: { shape: TagShape; color: TagColor; pattern: TagPattern }): string => {
  const s = FILENAME_PARTS.shape[config.shape];
  const c = FILENAME_PARTS.color[config.color];
  const p = FILENAME_PARTS.pattern[config.pattern];
  return `img/${s}_${c}_${p}.png`;
};
