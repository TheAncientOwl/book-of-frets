/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description App component.
 */

import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react';
import './App.css';
import { Chord } from './components/Chord';
import songs from './songs/index.json';

export const App = () => {
  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 8 }} spacing='1em'>
          {Object.entries(songs.chords).map(([chordName, frets]) => (
            <Chord key={chordName} name={chordName} frets={frets} />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};
