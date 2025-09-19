/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file setDocumentThemeColor.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Sets HTML document color theme.
 */

import { theme, type Theme } from '@chakra-ui/react';

export const getChakraColorHex = (colorString: string, theme: Theme): string | undefined => {
  const [colorName, shade] = colorString.split('.');
  const colorGroup = theme.colors[colorName as keyof typeof theme.colors];
  if (!colorGroup) return undefined;

  // If shade is provided (like "900")
  if (shade && typeof colorGroup === 'object') {
    return (colorGroup as Record<string, string>)[shade];
  }

  // If no shade, return the base color
  if (typeof colorGroup === 'string') return colorGroup;

  return undefined;
};

export const setDocumentThemeColor = (color: string) => {
  color = getChakraColorHex(color, theme) || color;

  document.documentElement.style.backgroundColor = color;
  document.body.style.backgroundColor = color;

  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.setAttribute('name', 'theme-color');
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute('content', color);
};
