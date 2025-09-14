/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description Render song segments data.
 */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import type { TChordsChunk, TSongSegment } from '@/types/song.types';

import { SongSegmentBody, SongSegmentHeading } from '@/components/SongRenderer/SongSegment';
import { useAppTheme } from '@/context/AppState';

type TSongSegmentsProps = {
  songSegments: Record<string, TSongSegment>;
  songSegmentsOrder: string[];
};

export const SongSegments = (props: TSongSegmentsProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Accordion
      allowMultiple
      padding='1.5em 1em'
      borderRadius='1rem'
      defaultIndex={props.songSegmentsOrder.map((_, i) => i)}
      // [*] theme colors
      backgroundColor={theme.chunks.background}
    >
      {props.songSegmentsOrder.map((songSegmentName, index) => {
        const songSegmentData = props.songSegments[songSegmentName];
        console.assert(
          songSegmentData !== undefined,
          `Failed to find song segment data for "${songSegmentName}"`
        );

        const showChordTimes = Object.entries(props.songSegments).some(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) =>
            value.type === 'chords' &&
            (value.chunks as TChordsChunk[]).some(pattern =>
              pattern.items.some(segment => segment.chordTimes > 1)
            )
        );

        return (
          <AccordionItem
            key={`${songSegmentName}-${index}`}
            // [*] theme colors
            borderColor={theme.chunks.divider}
          >
            <AccordionButton
              display='flex'
              justifyContent='flex-end'
              alignItems='center'
              position='relative'
              pt={['10px', '15px']}
              pb={['10px', '15px']}
              mb={['0px', '5px']}
              backgroundColor='blackAlpha.100'
              _hover={{ backgroundColor: 'blackAlpha.100' }}
            >
              <Box
                position='absolute'
                left='50%'
                transform='translateX(-50%)'
                textAlign='center'
                width='100%'
              >
                <SongSegmentHeading {...songSegmentData} showChordTimes={showChordTimes} />
              </Box>
              <AccordionIcon color={theme.chunks.item.title} />
            </AccordionButton>
            <AccordionPanel>
              <SongSegmentBody {...songSegmentData} showChordTimes={showChordTimes} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
