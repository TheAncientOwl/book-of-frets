/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description App component.
 */

import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react';
import './App.css';
import { Chord } from './components/Chord';
import chordsIndex from './configs/chords-index.json';

export const App = () => {
  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 8 }} spacing='1em'>
          {Object.entries(chordsIndex.index).map(([chordKeyName, chordConfig]) => (
            <Chord key={chordKeyName} name={chordConfig.name} frets={chordConfig.frets} />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};
