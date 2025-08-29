/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Segment.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render song pattern segment.
 */

import { Box, Flex, Tag, Text } from '@chakra-ui/react';
import type { IPatternSegment } from '../../configs/types/song.types.ts';

interface IPatternSegmentProps extends IPatternSegment {
  showChordTimes: boolean;
}

export const PatternSegment = (props: IPatternSegmentProps) => {
  return (
    <Flex direction='column' alignItems='center'>
      <Flex direction='row' gap='1em' mb='0.6em'>
        {props.chordIDs.map((chordId, index) => {
          return (
            <Box as='span' key={index}>
              <Tag backgroundColor='blue.200' fontWeight='bold'>
                {chordId}
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
