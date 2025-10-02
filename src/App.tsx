/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.33
 * @description App component.
 */

import { AppMenu } from '@/components/AppMenu/AppMenu';
import SongsIndexPage from '@/pages/SongsIndexPage';
import { AppStateContext } from '@/state/AppStateContext';
import { useAppStateValue } from '@/state/hooks/useAppStateValue';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const SongPage = lazy(() => import('@/pages/SongPage'));
const ChordsIndexPage = lazy(() => import('@/pages/ChordsIndexPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));

export const App = () => {
  const appStateValue = useAppStateValue();

  return (
    <ChakraProvider>
      <AppStateContext.Provider value={appStateValue}>
        <Box
          display='flex'
          width='100vw'
          height='100dvh'
          padding={['0em', '0em', '0.5em', '0.5em']}
          background={appStateValue.appTheme.value.general.background}
        >
          <AppMenu />

          <Routes>
            <Route path='/' element={<SongsIndexPage />} />

            <Route
              path='/:directory'
              element={
                <Suspense fallback={<div>Thinking...</div>}>
                  <SongPage />
                </Suspense>
              }
            />
            <Route
              path='/chords'
              element={
                <Suspense fallback={<div>Thinking...</div>}>
                  <ChordsIndexPage />
                </Suspense>
              }
            />
            <Route
              path='/about'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutPage />
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </AppStateContext.Provider>
    </ChakraProvider>
  );
};
