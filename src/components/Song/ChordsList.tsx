/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongChordsList.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Song chords list component.
 */

import { Accordion, AccordionButton, AccordionIcon, AccordionPanel } from '@/ui/Accordion';
import { Chord } from '@/ui/Chord/Chord';
import { useShallowAppStore } from '@/store/index';
import { Heading, List, ListItem } from '@chakra-ui/react';

type TSongChordsList = {
  chordIDs: string[];
};

export const SongChordsList = (props: TSongChordsList) => {
  const { chordsIndex, theme } = useShallowAppStore(state => ({
    chordsIndex: state.chordsIndex,
    theme: state.appTheme.song,
  }));

  return (props.chordIDs.length === 1 && props.chordIDs[0] === '-') ||
    props.chordIDs.length === 0 ? null : (
    <Accordion defaultOpen>
      <AccordionButton
        boxProps={{
          borderColor: theme.items.divider,
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
          color={theme.items.item.title}
        >
          Chords
        </Heading>

        <AccordionIcon
          boxProps={{
            position: 'absolute',
            right: '10px',
          }}
          // [*] theme colors
          color={theme.items.item.title}
        />
      </AccordionButton>

      <AccordionPanel>
        <List display='flex' gap='10px' overflowX='auto' padding={['1.1em 0em', '1.1em 1em']}>
          {props.chordIDs.map(chordID => {
            const config = chordsIndex[chordID];
            if (config === undefined) {
              console.error(`Missing chord config for ID ${chordID}`);
              return null;
            }

            return (
              <ListItem key={chordID}>
                <Chord {...config} containerProps={{ fontSize: ['7px', '8px', '9px'] }} />
              </ListItem>
            );
          })}
        </List>
      </AccordionPanel>
    </Accordion>
  );
};
