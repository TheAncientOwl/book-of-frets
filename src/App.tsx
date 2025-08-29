/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.7
 * @description App component.
 */

import chordsIndexRaw from './configs/chords-index.json';
import songConfigRaw from './configs/songs/sweater-weather.json';

import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import { Chord } from './components/ChordRenderer/Chord.tsx';
import { Song } from './components/SongRenderer/Song';
import type { TChordsIndex } from './configs/types/chord.types.ts';
import type { TSong } from './configs/types/song.types.ts';

export const App = () => {
  const songConfig = songConfigRaw as unknown as TSong;
  const chordsIndex = chordsIndexRaw.index as unknown as TChordsIndex;

  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <Song
          chordsIndex={chordsIndex}
          title={songConfig.title}
          artists={songConfig.artists}
          capo={songConfig.capo}
          songSegments={songConfig.songSegments}
          songSegmentsOrder={songConfig.songSegmentsOrder}
          resources={songConfig.resources}
        />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 8 }} mt='1em' spacing='1em'>
          {Object.entries(chordsIndex).map(([chordKeyName, chordConfig]) => (
            <Chord key={chordKeyName} name={chordConfig.name} frets={chordConfig.frets} />
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
};
