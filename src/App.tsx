/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.10
 * @description App component.
 */

import { Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider } from '@chakra-ui/react';

import { ChordsIndex } from '@/pages/ChordsIndex.tsx';
import { Home } from '@/pages/Home.tsx';
import { Song } from '@/pages/Song.tsx';
import { SongsIndex } from '@/pages/SongsIndex';
import { AppMenu } from '@/components/AppMenu/AppMenu';

export const App = () => {
  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <AppMenu />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:directory' element={<Song />} />
          <Route path='/index/chords' element={<ChordsIndex />} />
          <Route path='/index/songs' element={<SongsIndex />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
