/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file patchLocalStorageTheme.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Patch local storage for theme.
 */

import DefaultAppTheme from '@/theme/default.json';

export const patchLocalStorageTheme = () => {
  const storedTheme = localStorage.getItem('app-theme');
  if (storedTheme) {
    try {
      console.info('Patching theme');
      const parsed = JSON.parse(storedTheme);
      const merged = { ...DefaultAppTheme, ...parsed };
      localStorage.setItem('app-theme', JSON.stringify(merged));
    } catch (err) {
      console.warn('Failed to patch theme', err);
    }
  }
};
