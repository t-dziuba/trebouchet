import { Color } from 'three';

export const getColor = (color: string | number): Color => {
  if (typeof color === 'string') {
    const rgb = color
      .replace('#', '')
      .match(/.{2}/g)
      .map((col: string) => Number(col));

    return new Color(rgb[0], rgb[1], rgb[2]);
  }

  return new Color(color);
};
