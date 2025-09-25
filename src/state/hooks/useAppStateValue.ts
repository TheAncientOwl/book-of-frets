/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file useAppStateValue.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description .
 */

import type { TChordsIndex } from '@/common/types/chord.types';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import type { TAppState } from '@/state/state.type';
import DefaultAppTheme from '@/state/theme/default.json';
import type { TAppTheme } from '@/state/theme/types';
import { patchLocalStorageTheme } from '@/state/theme/utils/patchLocalStorageTheme';
import { useEffect, useMemo, useState } from 'react';

export const useAppStateValue = (): TAppState => {
  if (!sessionStorage.getItem('patched-app-theme')) {
    patchLocalStorageTheme();
    sessionStorage.setItem('patched-app-theme', 'true');
  }

  const [chordsIndex, setChordsIndex] = useState<TChordsIndex>({});
  const [appTheme, setAppTheme] = useLocalStorage<TAppTheme>('app-theme', DefaultAppTheme);
  const [appLogoURL, setAppLogoURL] = useLocalStorage<string>(
    'app-logo-url',
    `${import.meta.env.BASE_URL}logo.svg`
  );

  const [displayChordTimes, setDisplayChordTimes] = useLocalStorage<boolean>(
    'song-options-display-chord-times',
    true
  );
  const [displayTimes, setDisplayTimes] = useLocalStorage<boolean>(
    'song-options-display-times',
    true
  );
  const [displayStrummingPattern, setDisplayStrummingPattern] = useLocalStorage<boolean>(
    'song-options-display-strumming-pattern',
    true
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
      appTheme,
      setAppTheme,
      appLogoURL,
      setAppLogoURL,
      songSettings: {
        display: {
          times: { value: displayTimes, set: setDisplayTimes },
          chordTimes: { value: displayChordTimes, set: setDisplayChordTimes },
          strummingPattern: { value: displayStrummingPattern, set: setDisplayStrummingPattern },
        },
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
    ]
  );
};
