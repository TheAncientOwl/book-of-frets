/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file fetchArchivedJSON.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Fetches archived JSON config.
 */

import { gunzipSync, strFromU8 } from 'fflate';

export const fetchArchivedJSON = async (
  archiveURL: string,
  backupJsonURL: string,
  onSuccess: (json: unknown) => void,
  onError: (err: unknown) => void
) => {
  try {
    const response = await fetch(archiveURL);
    if (!response.ok) throw new Error('not found');

    const arrayBuffer = await response.arrayBuffer();
    const decompressed = gunzipSync(new Uint8Array(arrayBuffer));
    const jsonText = strFromU8(decompressed);

    const json = JSON.parse(jsonText);
    onSuccess(json);
  } catch (err) {
    console.error(`Failed to load JSON archive @ ${archiveURL} | reason: ${err}`);
    try {
      const res = await fetch(backupJsonURL);
      if (!res.ok) throw new Error(`JSON not found: ${backupJsonURL}`);
      const json = await res.json();
      onSuccess(json);
    } catch (fallbackErr) {
      console.log('xdd');
      onError(fallbackErr);
    }
  }
};
