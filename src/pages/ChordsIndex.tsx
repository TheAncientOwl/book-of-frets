/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsIndex.tsx
 * @author Alexandru Delegeanu
 * @version 0.4
 * @description Handle chords rendering.
 */

import { SimpleGrid } from '@chakra-ui/react';

import { Chord } from '@/components/ChordRenderer/Chord';
import { useAppStateContext } from '@/context/AppState';
import { Fragment } from 'react';

export const ChordsIndex = () => {
  const { chordsIndex } = useAppStateContext();

  return (
    <>
      {chordsIndex && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 8 }} mt='1em' spacing='1em'>
          {Object.entries(chordsIndex).map(([chordKeyName, chordConfig]) => (
            <Fragment key={chordKeyName}>
              {chordKeyName !== '-' && (
                <Chord key={chordKeyName} name={chordConfig.name} frets={chordConfig.frets} />
              )}
            </Fragment>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
