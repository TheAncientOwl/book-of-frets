/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.29
 * @description App component.
 */

import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider } from '@chakra-ui/react';

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { HomePage } from '@/pages/HomePage';

import { AppState, type TAppState } from '@/context/AppState';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { TAppTheme } from '@/theme/types';
import type { TChordsIndex } from '@/types/chord.types';

const SongPage = lazy(() => import('@/pages/SongPage'));
const ChordsIndexPage = lazy(() => import('@/pages/ChordsIndexPage'));
const SongsIndexPage = lazy(() => import('@/pages/SongsIndexPage'));

import DefaultAppTheme from '@/theme/default.json';
import { patchLocalStorageTheme } from '@/theme/patchLocalStorageTheme';

export const App = () => {
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
  }, [setChordsIndex, setAppTheme]);

  useEffect(() => {
    const ids = ['dynamic-1', 'dynamic-2', 'dynamic-3', 'dynamic-4'];
    for (const id of ids) {
      const link = document.getElementById(id) as HTMLLinkElement;
      if (link) {
        link.href = appLogoURL;
      }
    }
  }, [appLogoURL]);

  const appStateValue: TAppState = useMemo(
    () => ({
      chordsIndex,

      appTheme,
      setAppTheme,
      appLogoURL,
      setAppLogoURL,

      songSettings: {
        display: {
          times: {
            value: displayTimes,
            set: setDisplayTimes,
          },
          chordTimes: {
            value: displayChordTimes,
            set: setDisplayChordTimes,
          },
          strummingPattern: {
            value: displayStrummingPattern,
            set: setDisplayStrummingPattern,
          },
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
      displayStrummingPattern,

      setDisplayChordTimes,
      setDisplayStrummingPattern,
    ]
  );

  return (
    <ChakraProvider>
      <AppState.Provider value={appStateValue}>
        <Box
          display='flex'
          width='100vw'
          height='100dvh'
          padding={['0em', '0em', '1em', '2em']}
          background={appStateValue.appTheme.general.background}
        >
          <AppMenu />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/:directory'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SongPage />
                </Suspense>
              }
            />
            <Route
              path='/index/chords'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ChordsIndexPage />
                </Suspense>
              }
            />
            <Route
              path='/index/songs'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SongsIndexPage />
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </AppState.Provider>
    </ChakraProvider>
  );
};
