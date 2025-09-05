/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsIndexPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.7
 * @description Handle chords rendering.
 */

import { Container, SimpleGrid } from '@chakra-ui/react';

import { Chord } from '@/components/ChordRenderer/Chord';
import { useAppStateContext } from '@/context/AppState';
import { Fragment } from 'react';

export const ChordsIndexPage = () => {
  const { chordsIndex } = useAppStateContext();

  return (
    <Container maxW={['100vw', '5xl']} pt='1em' pb='1em' justifyItems='center'>
      <SimpleGrid columns={[1, 2, 3, 4, 5, 5]} spacing='1em' justifyItems='center'>
        {Object.entries(chordsIndex).map(([chordKeyName, chordConfig]) => (
          <Fragment key={chordKeyName}>
            {chordKeyName !== '-' && (
              <Chord key={chordKeyName} name={chordConfig.name} frets={chordConfig.frets} />
            )}
          </Fragment>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ChordsIndexPage;
