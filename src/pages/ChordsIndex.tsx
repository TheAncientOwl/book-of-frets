/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsIndex.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Handle chords rendering.
 */

import { SimpleGrid } from '@chakra-ui/react';

import { Chord } from '@/components/ChordRenderer/Chord';
import { Fragment, useEffect, useState } from 'react';
import type { TChordsIndex } from '@/types/chord.types';

export const ChordsIndex = () => {
  const [chordsIndex, setChordsIndex] = useState<TChordsIndex | null>(null);

  useEffect(() => {
    fetch('/chords/index.json')
      .then(res => res.json())
      .then(data => setChordsIndex(data.index as TChordsIndex))
      .catch(() => setChordsIndex(null));
  }, []);

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
