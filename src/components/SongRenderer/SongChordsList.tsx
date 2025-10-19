/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongChordsList.tsx
 * @author Alexandru Delegeanu
 * @version 0.7
 * @description Song chords list component.
 */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@/components/Accordion/Accordion';
import { Chord } from '@/components/ChordRenderer/Chord';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Heading, List, ListItem } from '@chakra-ui/react';

type TSongChordsList = {
  chordIDs: string[];
};

export const SongChordsList = (props: TSongChordsList) => {
  const { chordsIndex } = useAppState();
  const { song: theme } = useAppTheme();

  return (
    <Accordion defaultOpen>
      <AccordionButton
        boxProps={{
          borderColor: theme.chunks.divider,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Heading
          as='h3'
          size='md'
          textDecoration='underline'
          width='100%'
          // [*] theme colors
          color={theme.chunks.item.title}
        >
          Chords
        </Heading>

        <AccordionIcon
          boxProps={{
            position: 'absolute',
            right: '10px',
          }}
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
                <Chord {...config} containerProps={{ fontSize: ['8px', '10px', '11px'] }} />
              </ListItem>
            );
          })}
        </List>
      </AccordionPanel>
    </Accordion>
  );
};
