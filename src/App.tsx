/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.17
 * @description App component.
 */

import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider } from '@chakra-ui/react';

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { HomePage } from '@/pages/HomePage';

import { AppState, type TAppState } from '@/context/AppState';
import type { TChordsIndex } from '@/types/chord.types';

const SongPage = lazy(() => import('@/pages/SongPage'));
const ChordsIndexPage = lazy(() => import('@/pages/ChordsIndexPage'));
const SongsIndexPage = lazy(() => import('@/pages/SongsIndexPage'));

export const App = () => {
  const [chordsIndex, setChordsIndex] = useState<TChordsIndex>({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}chords/index.json`)
      .then(res => res.json())
      .then(data => setChordsIndex(data.index as TChordsIndex))
      .catch(() => setChordsIndex({}));
  }, []);

  const appStateValue: TAppState = useMemo(() => ({ chordsIndex }), [chordsIndex]);

  return (
    <ChakraProvider>
      <AppState.Provider value={appStateValue}>
        <Box
          display='flex'
          width='100vw'
          minHeight='100vh'
          background='gray.900'
          padding={['0em', '0em', '1em', '2em']}
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
