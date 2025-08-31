/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.9
 * @description App component.
 */

import { Link, Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider, Flex } from '@chakra-ui/react';

import { ChordsIndex } from '@/pages/ChordsIndex.tsx';
import { Home } from '@/pages/Home.tsx';
import { Song } from '@/pages/Song.tsx';
import { SongsIndex } from '@/pages/SongsIndex';

export const App = () => {
  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <Flex gap='1em' color='white' mb='1em'>
          <Link to='/'>Home</Link>
          <Link to='/sweater-weather'>Song</Link>
          <Link to='/index/chords'>Chords Index</Link>
          <Link to='/index/songs'>Songs Index</Link>
        </Flex>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<Song />} />
          <Route path='/index/chords' element={<ChordsIndex />} />
          <Route path='/index/songs' element={<SongsIndex />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
