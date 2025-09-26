/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file addSongHistoryEntry.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Utility function to add a song entry to the history.
 */

import type { TSongHistoryEntry } from '@/state/default';

/**
 * @brief Adds song history to given array.
 * @return Array with given entry added.
 *
 */
export const addSongHistoryEntry = (
  entry: TSongHistoryEntry,
  where: TSongHistoryEntry[]
): TSongHistoryEntry[] => {
  if (where.length > 0 && where[0].directory === entry.directory) {
    return where;
  }

  return [entry, ...where];
};
