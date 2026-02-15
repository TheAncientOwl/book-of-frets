/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSection.tsx
 * @author Alexandru Delegeanu
 * @version 2.2
 * @description Render song section.
 */

import type {
  TSongSection,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { GAP_BETWEEN_CHORD_LINES } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2';
import { SongSectionEntry } from '@/components/Song/Sections/SongSectionEntry';
import { useAppStore } from '@/store/index';
import { Accordion, AccordionButton, AccordionIcon, AccordionPanel } from '@/ui/Accordion';
import { Flex, Heading, Tag, Text } from '@chakra-ui/react';

type TSongSectionProps = TSongSection & {
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
  strumms: TStrummingPattern[];
};

export const SongSection = (props: TSongSectionProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <Accordion defaultOpen>
      <AccordionButton
        boxProps={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          // [*] theme colors
          borderColor: theme.items.divider,
        }}
      >
        <Heading
          as='h3'
          size='md'
          textAlign='center'
          textDecoration='underline'
          textTransform='capitalize'
          // [*] theme colors
          color={theme.items.item.title}
        >
          <Text as='span' position='relative' fontSize={['lg', 'xl']}>
            {props.name}
            {props.times > 1 && (
              <Tag
                size='sm'
                position='absolute'
                bottom={0}
                right={0}
                transform='translate(120%, 20%)'
                // [*] theme colors
                backgroundColor={theme.items.item.times.background}
                color={theme.items.item.times.color}
              >
                x{props.times}
              </Tag>
            )}
          </Text>
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
        <Flex direction='column' gap={GAP_BETWEEN_CHORD_LINES} pt='1em' pb='1.5em'>
          {props.entries.map((entry, idx) => (
            <SongSectionEntry
              key={idx}
              entry={entry}
              strumms={props.strumms}
              showLyrics={props.showLyrics}
              lyrics={props.lyrics}
            />
          ))}
        </Flex>
      </AccordionPanel>
    </Accordion>
  );
};
