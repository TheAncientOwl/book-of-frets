/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file setDocumentScrollbarColors.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Sets HTML document scrollbars theme.
 */

import { getChakraColorHex } from '@/store/theme/utils/getChakraColorHex';
import { theme } from '@chakra-ui/react';

export const setDocumentScrollbarColors = (track: string, thumb: string) => {
  const styleId = 'scrollbar-style';
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

  const trackHex = getChakraColorHex(track, theme) || track;
  const thumbHex = getChakraColorHex(track, theme) || thumb;

  const css = `
    /* Webkit browsers (Chrome, Edge, Safari) */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: ${trackHex};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${thumbHex};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${thumbHex};
    }
    /* Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: ${thumbHex} ${trackHex};
    }
  `;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = css;
};
