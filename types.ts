export enum TagShape {
  BONE = 'Bone',
  HEART = 'Heart',
  CIRCLE = 'Circle',
}

export enum TagColor {
  PINK = 'Pink',
  WHITE = 'White',
  BLUE = 'Blue',
}

export enum TagPattern {
  SOLID = 'Solid',
  DOTS = 'Dots',
  STRIPES = 'Stripes',
}

export enum TagSize {
  S = 'S',
  M = 'M',
  L = 'L',
}

export interface TagConfig {
  shape: TagShape;
  color: TagColor;
  pattern: TagPattern;
  size: TagSize;
  text: string;
}

export interface CartItem extends TagConfig {
  id: number;
  price: number;
}

export interface OptionItem<T> {
  value: T;
  label: string;
}
