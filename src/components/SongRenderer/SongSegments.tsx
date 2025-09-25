/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegments.tsx
 * @author Alexandru Delegeanu
 * @version 0.8
 * @description Render song segments data.
 */

import { SongSegmentBody, SongSegmentHeading } from '@/components/SongRenderer/SongSegment';
import { useAppTheme } from '@/context/AppState';
import type { TSongSegment } from '@/types/song.types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

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
                <SongSegmentHeading {...songSegmentData} />
              </Box>
              <AccordionIcon color={theme.chunks.item.title} />
            </AccordionButton>
            <AccordionPanel>
              <SongSegmentBody {...songSegmentData} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
