/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsIndexPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.9
 * @description Handle chords rendering.
 */

import { Container, SimpleGrid } from '@chakra-ui/react';

import { Chord } from '@/components/ChordRenderer/Chord';
import { createSmartList } from '@/components/SmartList/index';
import { useAppStateContext } from '@/context/AppState';
import type { TChord } from '@/types/chord.types';
import { Fragment } from 'react';

const ChordsList = createSmartList<[string, TChord]>();

export const ChordsIndexPage = () => {
  const { chordsIndex } = useAppStateContext();

  return (
    <Container maxW={['100vw', '5xl']} pt='1em' pb='1em' justifyItems='center'>
      <ChordsList.Wrapper
        context={ChordsList.context}
        setup={{
          data: Object.entries(chordsIndex),
          getKey: val => val[0],
          defaultSorted: true,
          cmp: (c1, c2) => (c1[0] > c2[0] ? 1 : -1),
        }}
      >
        <ChordsList.SearchBar useContext={ChordsList.context.use} color='white' mb='20px' />

        <ChordsList.Content
          useContext={ChordsList.context.use}
          as={SimpleGrid}
          asProps={{
            columns: [1, 2, 3, 4, 5, 5],
            spacing: '1em',
            justifyItems: 'center',
          }}
          render={([chordKeyName, chordConfig]) => (
            <Fragment key={chordKeyName}>
              {chordKeyName !== '-' && (
                <Chord key={chordKeyName} name={chordConfig.name} frets={chordConfig.frets} />
              )}
            </Fragment>
          )}
        />
      </ChordsList.Wrapper>
    </Container>
  );
};

export default ChordsIndexPage;
