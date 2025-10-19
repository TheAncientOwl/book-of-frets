/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.14
 * @description Render song segments data.
 */

import type { TSongSegment, TStrummingPattern } from '@/common/types/song.types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@/components/Accordion/Accordion';
import { SongSegmentBody, SongSegmentHeading } from '@/components/SongRenderer/SongSegment';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box } from '@chakra-ui/react';

type TSongSegmentsProps = {
  segments: Record<string, TSongSegment>;
  order: string[];
  strumms: TStrummingPattern[];
};

export const SongSegments = (props: TSongSegmentsProps) => {
  const { song: theme } = useAppTheme();

  return (
    <>
      {props.order.map((songSegmentName, index) => {
        const songSegmentData = props.segments[songSegmentName];
        console.assert(
          songSegmentData !== undefined,
          `Failed to find song segment data for "${songSegmentName}"`
        );

        return (
          <Accordion
            defaultOpen
            key={`${songSegmentName}-${index}`}
            // [*] theme colors
            boxProps={
              {
                // borderColor: theme.chunks.divider,
                // backgroundColor: 'blackAlpha.400',
              }
            }
            // borderColor={theme.chunks.divider}
          >
            <AccordionButton
              // [*] theme colors
              // backgroundColor='blackAlpha.100'
              // _hover={{ backgroundColor: 'blackAlpha.100' }}
              boxProps={{
                borderColor: theme.chunks.divider,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box textAlign='center' width='100%'>
                <SongSegmentHeading {...songSegmentData} strumms={props.strumms} />
              </Box>
              <AccordionIcon
                boxProps={{
                  position: 'absolute',
                  right: '10px',
                }}
                // [*] theme colors
                color={theme.chunks.item.title}
              />
              {/* <AccordionIcon
                position='absolute'
                right='10px'
                // transform='translateX(-50%)'
                // [*] theme colors
                color={theme.chunks.item.title}
              /> */}
            </AccordionButton>
            <AccordionPanel>
              <SongSegmentBody {...songSegmentData} strumms={props.strumms} />
            </AccordionPanel>
          </Accordion>
        );
      })}
    </>
  );
};
