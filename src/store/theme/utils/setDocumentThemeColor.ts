/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file setDocumentThemeColor.ts
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Sets HTML document color theme.
 */

import { getChakraColorHex } from '@/store/theme/utils/getChakraColorHex';
import { theme } from '@chakra-ui/react';

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
