/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.13
 * @description App component.
 */

import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider } from '@chakra-ui/react';

import { AppMenu } from '@/components/AppMenu/AppMenu';
import { AppState, type AppStateType } from '@/context/AppState';
import { ChordsIndex } from '@/pages/ChordsIndex.tsx';
import { Home } from '@/pages/Home.tsx';
import { Song } from '@/pages/Song.tsx';
import { SongsIndex } from '@/pages/SongsIndex';
import type { TChordsIndex } from '@/types/chord.types';
import { useEffect, useState } from 'react';

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
            <Route path={`${import.meta.env.BASE_URL}`} element={<Home />} />
            <Route path={`${import.meta.env.BASE_URL}:directory`} element={<Song />} />
            <Route path={`${import.meta.env.BASE_URL}index/chords`} element={<ChordsIndex />} />
            <Route path={`${import.meta.env.BASE_URL}index/songs`} element={<SongsIndex />} />
          </Routes>
        </Box>
      </AppState.Provider>
    </ChakraProvider>
  );
};
