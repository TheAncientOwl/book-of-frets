/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Segment.tsx
 * @author Alexandru Delegeanu
 * @version 0.4
 * @description Render song pattern segment.
 */

import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import type { TChordsPatternSegment } from '../../configs/types/song.types.ts';
import type { TChordsIndex } from '../../configs/types/chord.types.ts';

type TChordsPatternSegmentProps = TChordsPatternSegment & {
  showChordTimes: boolean;
  chordsIndex: TChordsIndex;
};

const NO_CHORD_ID = '-';

export const ChordsPatternSegment = (props: TChordsPatternSegmentProps) => {
  return (
    <Flex direction='column' alignItems='center'>
      <Flex direction='row' gap='1em' mb='0.6em'>
        {props.chordIDs.map((chordId, index) => {
          const chordConfig = props.chordsIndex[chordId];

          console.assert(
            chordId !== NO_CHORD_ID && chordConfig !== undefined,
            `Missing chord index for ID ${chordId}`
          );

          return (
            <Box as='span' key={index}>
              <Tag backgroundColor='blue.200' fontWeight='bold'>
                {chordId !== NO_CHORD_ID ? chordConfig.name : '-'}
              </Tag>
            </Box>
          );
        })}
      </Flex>

      {props.showChordTimes && (
        <Text fontSize='xs' fontWeight='bold'>
          x{props.chordTimes}
        </Text>
      )}

      <Box position='relative' mt='0.4em'>
        <Flex direction='row' gap='0.5em' alignItems='end'>
          {props.strummingPattern.map((pattern, index) => {
            return (
              <Text key={index} fontWeight='bold'>
                {pattern}
              </Text>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};
