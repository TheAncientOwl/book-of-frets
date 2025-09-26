/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file useAppStateValue.ts
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Main app state hook.
 */

import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import type { TChordsIndex } from '@/common/types/chord.types';
import { LocalStorageKeys, SessionStorageKeys } from '@/state/common/storageKeys';
import { DefaultAppState, type TAppState, type TSongHistoryEntry } from '@/state/default';
import DefaultAppTheme from '@/state/theme/default.json';
import type { TAppTheme } from '@/state/theme/types';
import { patchLocalStorageTheme } from '@/state/theme/utils/patchLocalStorageTheme';
import { useEffect, useMemo, useState } from 'react';

export const useAppStateValue = (): TAppState => {
  if (!sessionStorage.getItem(SessionStorageKeys.patchedAppTheme)) {
    patchLocalStorageTheme();
    sessionStorage.setItem(SessionStorageKeys.patchedAppTheme, 'true');
  }

  const [chordsIndex, setChordsIndex] = useState<TChordsIndex>(DefaultAppState.chordsIndex);
  const [appTheme, setAppTheme] = useLocalStorage<TAppTheme>(
    LocalStorageKeys.appTheme,
    DefaultAppTheme
  );

  const [appLogoURL, setAppLogoURL] = useLocalStorage<string>(
    LocalStorageKeys.appLogoURL,
    DefaultAppState.appLogoURL.value
  );

  const [displayChordTimes, setDisplayChordTimes] = useLocalStorage<boolean>(
    LocalStorageKeys.displayChordTimes,
    DefaultAppState.songSettings.display.chordTimes.value
  );
  const [displayTimes, setDisplayTimes] = useLocalStorage<boolean>(
    LocalStorageKeys.displayTimes,
    DefaultAppState.songSettings.display.times.value
  );
  const [displayStrummingPattern, setDisplayStrummingPattern] = useLocalStorage<boolean>(
    LocalStorageKeys.displayStrummingPattern,
    DefaultAppState.songSettings.display.strummingPattern.value
  );

  const [songsHistory, setSongsHistory] = useLocalStorage<TSongHistoryEntry[]>(
    LocalStorageKeys.songsHistory,
    DefaultAppState.songsHistory.value
  );

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}chords/index.json`)
      .then(res => res.json())
      .then(data => setChordsIndex(data.index as TChordsIndex))
      .catch(() => setChordsIndex({}));
  }, []);

  useEffect(() => {
    const ids = ['dynamic-1', 'dynamic-2', 'dynamic-3', 'dynamic-4'];
    for (const id of ids) {
      const link = document.getElementById(id) as HTMLLinkElement;
      if (link) link.href = appLogoURL;
    }
  }, [appLogoURL]);

  return useMemo(
    () => ({
      chordsIndex,

      appTheme: {
        value: appTheme,
        set: setAppTheme,
      },

      appLogoURL: {
        value: appLogoURL,
        set: setAppLogoURL,
      },

      songSettings: {
        display: {
          times: { value: displayTimes, set: setDisplayTimes },
          chordTimes: { value: displayChordTimes, set: setDisplayChordTimes },
          strummingPattern: { value: displayStrummingPattern, set: setDisplayStrummingPattern },
        },
      },

      songsHistory: {
        value: songsHistory,
        set: setSongsHistory,
      },
    }),
    [
      chordsIndex,
      appTheme,
      setAppTheme,
      appLogoURL,
      setAppLogoURL,
      displayTimes,
      setDisplayTimes,
      displayChordTimes,
      setDisplayChordTimes,
      displayStrummingPattern,
      setDisplayStrummingPattern,
      songsHistory,
      setSongsHistory,
    ]
  );
};
