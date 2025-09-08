/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render song segments data.
 */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
              position='relative'
              backgroundColor='blackAlpha.100'
              borderRadius='0px 0px 7px 7px'
            >
              <SongSegmentHeading {...songSegmentData} showChordTimes={showChordTimes} />
              <AccordionIcon
                position='absolute'
                right='0'
                top='50%'
                transform='translate(-50%, -50%)'
              />
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
