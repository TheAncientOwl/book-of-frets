/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.30
 * @description App component.
 */

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { HomePage } from '@/pages/HomePage';
import { AppStateContext } from '@/state/AppStateContext';
import { useAppStateValue } from '@/state/hooks/useAppStateValue';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const SongPage = lazy(() => import('@/pages/SongPage'));
const ChordsIndexPage = lazy(() => import('@/pages/ChordsIndexPage'));
const SongsIndexPage = lazy(() => import('@/pages/SongsIndexPage'));

export const App = () => {
  const appStateValue = useAppStateValue();

  return (
    <ChakraProvider>
      <AppStateContext.Provider value={appStateValue}>
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
      </AppStateContext.Provider>
    </ChakraProvider>
  );
};
