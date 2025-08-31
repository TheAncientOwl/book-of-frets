/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.8
 * @description App component.
 */

import { Link, Route, Routes } from 'react-router-dom';

import { Box, ChakraProvider, Flex } from '@chakra-ui/react';

import { ChordsIndex } from '@/pages/ChordsIndex.tsx';
import { Home } from '@/pages/Home.tsx';
import { Song } from '@/pages/Song.tsx';

export const App = () => {
  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <Flex gap='1em' color='white'>
          <Link to='/'>Home</Link>
          <Link to='/chords-index'>ChordIndex</Link>
          <Link to='/song/sweater-weather'>Song</Link>
        </Flex>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chords-index' element={<ChordsIndex />} />
          <Route path='/song/:id' element={<Song />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
