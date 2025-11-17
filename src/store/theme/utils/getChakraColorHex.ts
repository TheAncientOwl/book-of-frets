/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file getChakraColorHex.ts
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Utility function for parsing ChakraUI colors to hex codes.
 */

import { type Theme } from '@chakra-ui/react';

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
