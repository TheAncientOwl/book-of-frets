/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.15
 * @description App component.
 */

import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider } from '@chakra-ui/react';

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { AppState, type AppStateType } from '@/context/AppState';
import { Home } from '@/pages/Home.tsx';
import type { TChordsIndex } from '@/types/chord.types';
import { lazy, Suspense, useEffect, useState } from 'react';

const Song = lazy(() => import('@/pages/Song.tsx'));
const ChordsIndex = lazy(() => import('@/pages/ChordsIndex.tsx'));
const SongsIndex = lazy(() => import('@/pages/SongsIndex'));

export const App = () => {
  const [chordsIndex, setChordsIndex] = useState<TChordsIndex>({});

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}chords/index.json`)
      .then(res => res.json())
      .then(data => setChordsIndex(data.index as TChordsIndex))
      .catch(() => setChordsIndex({}));
  }, []);

  const appStateValue: AppStateType = { chordsIndex };

  return (
    <ChakraProvider>
      <AppState.Provider value={appStateValue}>
        <Box
          width='100vw'
          minHeight='100vh'
          background='gray.900'
          padding={['0em', '0em', '1em', '2em']}
        >
          <AppMenu />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/:directory'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Song />
                </Suspense>
              }
            />
            <Route
              path='/index/chords'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ChordsIndex />
                </Suspense>
              }
            />
            <Route
              path='/index/songs'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SongsIndex />
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </AppState.Provider>
    </ChakraProvider>
  );
};
