/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsIndexPage.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Handle chords rendering.
 */

import type { TChord } from '@/common/types/chord.types';
import { useShallowAppStore } from '@/store/index';
import { setDocumentThemeColor } from '@/store/theme/utils/setDocumentThemeColor';
import { Chord } from '@/ui/Chord/Chord';
import { createSmartList } from '@/ui/SmartList/SmartList';
import { Box, Container, Flex, SimpleGrid } from '@chakra-ui/react';
import { Fragment, useLayoutEffect } from 'react';

const ChordsList = createSmartList<[string, TChord]>();

export const ChordsIndexPage = () => {
  const { chordsIndex, theme } = useShallowAppStore(state => ({
    chordsIndex: state.chordsIndex,
    theme: state.appTheme.chordsIndexPage,
  }));

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  return (
    <Container
      maxW={['100vw', '5xl']}
      height='100%'
      display='flex'
      flexDirection='column'
      padding={['1em 0em 0.2em 0em', '1em']}
      borderRadius={['0em', '0.5em']}
      // [*] theme colors
      backgroundColor={theme.background}
    >
      <ChordsList.Wrapper
        context={ChordsList.context}
        setup={{
          data: Object.entries(chordsIndex),
          getKey: val => val[1].name,
          defaultSorted: true,
          cmp: (c1, c2) => (c1[0] > c2[0] ? 1 : -1),
        }}
      >
        <Flex mx='auto' justifyContent='center' width='250px' mb='20px'>
          <ChordsList.SearchBar
            useContext={ChordsList.context.use}
            // [*] theme colors
            backgroundColor={theme.searchBar.background}
            color={theme.searchBar.color}
            borderColor={theme.searchBar.border}
            _focus={{
              borderColor: theme.searchBar.focusBorder,
            }}
          />
        </Flex>

        <Box flex='1' overflowY='scroll'>
          <ChordsList.Content
            useContext={ChordsList.context.use}
            as={SimpleGrid}
            asProps={{
              columns: [2, 3, 4, 5],
              spacing: '1em',
              justifyItems: 'center',
            }}
            render={([chordKeyName, chordConfig]) => (
              <Fragment key={chordKeyName}>
                {chordKeyName !== '-' && <Chord key={chordKeyName} {...chordConfig} />}
              </Fragment>
            )}
          />
        </Box>
      </ChordsList.Wrapper>
    </Container>
  );
};

export default ChordsIndexPage;
