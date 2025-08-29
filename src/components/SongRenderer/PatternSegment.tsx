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

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux';

export interface IPatternSegmentProps {
  chordIDs: string[];
  chordTimes: number;
  strummingPattern: TStrummingMove[];
}

export const PatternSegment = (props: IPatternSegmentProps) => {
  return (
    <Flex alignItems='center' gap='1em'>
      <Flex direction='column' alignItems='center' gap='1em'>
        <Flex direction='row' gap='1em'>
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

        <Box position='relative'>
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
    </Flex>
  );
};
