/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongChordsList.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description Song chords list component.
 */

import { Chord } from '@/components/ChordRenderer/Chord';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';

type TSongChordsList = {
  chordIDs: string[];
};

export const SongChordsList = (props: TSongChordsList) => {
  const { chordsIndex } = useAppState();
  const { song: theme } = useAppTheme();

  return (
    <AccordionItem
      // [*] theme colors
      borderColor={theme.chunks.divider}
    >
      <AccordionButton
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='relative'
        pt={['10px', '15px']}
        pb={['10px', '15px']}
        mb={['0px', '5px']}
        // [*] theme colors
        backgroundColor='blackAlpha.100'
        _hover={{ backgroundColor: 'blackAlpha.100' }}
      >
        <Box textAlign='center' width='100%'>
          <Heading
            as='h3'
            size='md'
            textDecoration='underline'
            // [*] theme colors
            color={theme.chunks.item.title}
          >
            Chords
          </Heading>
        </Box>

        <AccordionIcon
          position='absolute'
          right='10px'
          // [*] theme colors
          color={theme.chunks.item.title}
        />
      </AccordionButton>

      <AccordionPanel>
        <List display='flex' gap='10px' overflowX='auto'>
          {props.chordIDs.map(chordID => {
            const config = chordsIndex[chordID];
            if (config === undefined) {
              console.error(`Missing chord config for ID ${chordID}`);
              return null;
            }

            return (
              <ListItem key={chordID}>
                <Chord {...config} containerProps={{ fontSize: ['8px', '10px', '12px'] }} />
              </ListItem>
            );
          })}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
