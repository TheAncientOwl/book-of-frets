/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
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

import type { TChordsPattern, TSongSegment } from '@/types/song.types';

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
      backgroundColor={theme.segments.background}
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
            (value.patterns as TChordsPattern[]).some(pattern =>
              pattern.segments.some(segment => segment.chordTimes > 1)
            )
        );

        return (
          <AccordionItem
            key={`${songSegmentName}-${index}`}
            // [*] theme colors
            borderColor={theme.segments.divider}
          >
            <AccordionButton
              display='flex'
              justifyContent='flex-end'
              alignItems='center'
              position='relative'
              pt={['5px', '15px']}
              pb={['5px', '15px']}
            >
              <Box position='absolute' left='50%' transform='translateX(-50%)' textAlign='center'>
                <SongSegmentHeading {...songSegmentData} showChordTimes={showChordTimes} />
              </Box>
              <AccordionIcon color={theme.segments.item.title} />
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
