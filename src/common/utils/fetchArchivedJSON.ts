/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file fetchArchivedJSON.ts
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Fetches archived JSON config.
 */

import { gunzipSync, strFromU8 } from 'fflate';

export const fetchArchivedJSON = async (
  archiveURL: string,
  backupJsonURL: string,
  devJsonURL: string,
  onSuccess: (json: unknown) => void,
  onError: (err: unknown) => void
) => {
  if (import.meta.env.DEV) {
    console.info(`::fetchArchivedJSON(): dev mode - fetching ${devJsonURL}`);

    fetch(devJsonURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `::fetchArchivedJSON(): Failed to fetch config.json: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then(json => onSuccess(json))
      .catch(error => onError(error));

    return;
  }

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
      onError(fallbackErr);
    }
  }
};
