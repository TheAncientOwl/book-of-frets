/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.36
 * @description App component.
 */

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { Loading } from '@/components/Loading/Loading';
import { SongPage } from '@/pages/SongPage';
import { SongsIndexPage } from '@/pages/SongsIndexPage';
import { AppStateContext } from '@/state/AppStateContext';
import { useAppStateValue } from '@/state/hooks/useAppStateValue';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ChordsIndexPage = lazy(() => import('@/pages/ChordsIndexPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

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
            <Route path='/' element={<Navigate to='/songs' replace />} />
            <Route path='/songs' element={<SongsIndexPage />} />
            <Route path='/songs/:directory' element={<SongPage />} />

            <Route
              path='/chords'
              element={
                <Suspense fallback={<Loading />}>
                  <ChordsIndexPage />
                </Suspense>
              }
            />

            <Route
              path='/about'
              element={
                <Suspense fallback={<Loading />}>
                  <AboutPage />
                </Suspense>
              }
            />

            <Route
              path='*'
              element={
                <Suspense fallback={<Loading />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>
        </Box>
      </AppStateContext.Provider>
    </ChakraProvider>
  );
};
