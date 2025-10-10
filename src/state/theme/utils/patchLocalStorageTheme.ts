/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file patchLocalStorageTheme.ts
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description Patch local storage for theme.
 */

import { LocalStorageKeys } from '@/state/common/storageKeys';
import DefaultAppTheme from '@/state/theme/default.min.json';

/**
 * @brief Recursively deep-merges two objects.
 * - Properties from `override` take precedence.
 * - Nested objects are merged instead of replaced.
 *
 */
export const deepMerge = <T>(base: T, override: Partial<T>): T => {
  const baseRecord = base as unknown as Record<string, unknown>;
  const overrideRecord = override as unknown as Record<string, unknown>;
  const result: Record<string, unknown> = { ...baseRecord };

  for (const key in overrideRecord) {
    if (!Object.prototype.hasOwnProperty.call(overrideRecord, key)) continue;

    const baseVal = baseRecord[key];
    const overrideVal = overrideRecord[key];

    if (
      baseVal !== null &&
      typeof baseVal === 'object' &&
      !Array.isArray(baseVal) &&
      overrideVal !== null &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else {
      result[key] = overrideVal;
    }
  }

  return result as T;
};

export const patchLocalStorageTheme = () => {
  const storedTheme = localStorage.getItem(LocalStorageKeys.appTheme);
  if (storedTheme) {
    try {
      console.info('Patching theme');
      const parsed = JSON.parse(storedTheme);
      const merged = deepMerge(DefaultAppTheme, parsed);
      console.info({ before: parsed, after: merged, default: DefaultAppTheme });

      localStorage.setItem(LocalStorageKeys.appTheme, JSON.stringify(merged));

      console.info('Patched theme successfully');
    } catch (err) {
      console.warn('Failed to patch theme', err);
    }
  }
};
