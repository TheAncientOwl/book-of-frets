/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file App.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description App component.
 */

import { Box, ChakraProvider } from '@chakra-ui/react';
import './App.css';
// import chordsIndex from './configs/chords-index.json';

import songConfigRaw from './configs/songs/without-you.json';
import { Song, type ISongProps } from './components/SongRenderer/Song';

export const App = () => {
  const songConfig = songConfigRaw as unknown as ISongProps;

  return (
    <ChakraProvider>
      <Box width='100vw' minHeight='100vh' background='blackAlpha.900' padding='2em'>
        <Song
          title={songConfig.title}
          artists={songConfig.artists}
          capo={songConfig.capo}
          songSegments={songConfig.songSegments}
          songSegmentsOrder={songConfig.songSegmentsOrder}
          resources={songConfig.resources}
        />
        {/* <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 8 }} spacing='1em'>
          {Object.entries(chordsIndex.index).map(([chordKeyName, chordConfig]) => (
            <Chord key={chordKeyName} name={chordConfig.name} frets={chordConfig.frets} />
          ))}
        </SimpleGrid> */}
      </Box>
    </ChakraProvider>
  );
};
