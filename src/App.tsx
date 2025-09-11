/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.26
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
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));

import DefaultAppTheme from '@/theme/default.json';

export const App = () => {
  const [chordsIndex, setChordsIndex] = useState<TChordsIndex>({});
  const [appTheme, setAppTheme] = useLocalStorage<TAppTheme>('app-theme', DefaultAppTheme);
  const [appLogoURL, setAppLogoURL] = useLocalStorage<string>(
    'app-logo-url',
    `${import.meta.env.BASE_URL}logo.svg`
  );

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}chords/index.json`)
      .then(res => res.json())
      .then(data => setChordsIndex(data.index as TChordsIndex))
      .catch(() => setChordsIndex({}));
  }, [setChordsIndex, setAppTheme]);

  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.href = appLogoURL;
  }, [appLogoURL]);

  const appStateValue: TAppState = useMemo(
    () => ({ chordsIndex, appTheme, setAppTheme, appLogoURL, setAppLogoURL }),
    [chordsIndex, appTheme, setAppTheme, appLogoURL, setAppLogoURL]
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
            <Route
              path='/settings'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SettingsPage />
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </AppState.Provider>
    </ChakraProvider>
  );
};
