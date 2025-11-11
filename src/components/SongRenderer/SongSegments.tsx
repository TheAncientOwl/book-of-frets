/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.18
 * @description Render song segments data.
 */

import type {
  TSongSegment,
  TSongSegmentLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@/components/Accordion/Accordion';
import { SongSegmentBody, SongSegmentHeading } from '@/components/SongRenderer/SongSegment';
import { useAppStore } from '@/store/index';

type TSongSegmentsProps = {
  segments: Record<string, TSongSegment>;
  order: string[];
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSegmentLyrics[];
};

export const SongSegments = (props: TSongSegmentsProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <>
      {props.order.map((songSegmentName, index) => {
        const songSegmentData = props.segments[songSegmentName];
        console.assert(
          songSegmentData !== undefined,
          `Failed to find song segment data for "${songSegmentName}"`
        );

        return (
          <Accordion defaultOpen key={`${songSegmentName}-${index}`}>
            <AccordionButton
              boxProps={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                // [*] theme colors
                borderColor: theme.chunks.divider,
              }}
            >
              <SongSegmentHeading
                {...songSegmentData}
                strumms={props.strumms}
                showLyrics={props.showLyrics}
                lyrics={props.lyrics[index]}
              />
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
              <SongSegmentBody
                {...songSegmentData}
                strumms={props.strumms}
                showLyrics={props.showLyrics}
                lyrics={props.lyrics[index]}
              />
            </AccordionPanel>
          </Accordion>
        );
      })}
    </>
  );
};
