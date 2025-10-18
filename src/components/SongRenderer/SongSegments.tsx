/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.13
 * @description Render song segments data.
 */

import type { TSongSegment, TStrummingPattern } from '@/common/types/song.types';
import { SongSegmentBody, SongSegmentHeading } from '@/components/SongRenderer/SongSegment';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

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
          <AccordionItem
            key={`${songSegmentName}-${index}`}
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
                <SongSegmentHeading {...songSegmentData} strumms={props.strumms} />
              </Box>
              <AccordionIcon
                position='absolute'
                right='10px'
                // transform='translateX(-50%)'
                // [*] theme colors
                color={theme.chunks.item.title}
              />
            </AccordionButton>
            <AccordionPanel>
              <SongSegmentBody {...songSegmentData} strumms={props.strumms} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </>
  );
};
