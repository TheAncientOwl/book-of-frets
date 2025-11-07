/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.38
 * @description App component.
 */

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { Loading } from '@/components/Loading/Loading';
import { SongPage } from '@/pages/SongPage';
import { SongsIndexPage } from '@/pages/SongsIndexPage';
import { setDocumentScrollbarColors } from '@/store/theme/utils/setDocumentScrollbarColors';
import { useShallowAppStore } from '@/store/index';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ChordsIndexPage = lazy(() => import('@/pages/ChordsIndexPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const App = () => {
  const { chordsIndex, updateChordsIndex, appLogoURL, appTheme } = useShallowAppStore(state => ({
    chordsIndex: state.chordsIndex,
    updateChordsIndex: state.updateChordsIndex,
    appLogoURL: state.appLogoURL,
    appTheme: state.appTheme,
  }));

  useEffect(() => {
    if (Object.keys(chordsIndex).length === 0) {
      updateChordsIndex();
    }
  }, [chordsIndex, updateChordsIndex]);

  useEffect(() => {
    const ids = ['dynamic-1', 'dynamic-2', 'dynamic-3', 'dynamic-4'];
    for (const id of ids) {
      const link = document.getElementById(id) as HTMLLinkElement;
      if (link) link.href = appLogoURL;
    }
  }, [appLogoURL]);

  useEffect(() => {
    setDocumentScrollbarColors(appTheme.scrollbar.track, appTheme.scrollbar.thumb);
  }, [appTheme]);

  return (
    <ChakraProvider>
      <Box
        as='main'
        display='flex'
        width='100vw'
        height='100dvh'
        padding={['0em', '0em', '0.5em', '0.5em']}
        background={appTheme.general.background}
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
    </ChakraProvider>
  );
};
