/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render song segment.
 */

import { Box, Flex, Heading } from '@chakra-ui/react';
import { Pattern, type IPatternProps } from './Pattern';

export interface ISegmentProps {
  name: string;
  type: 'chords' | 'strings';
  patterns: IPatternProps[];
}

export const SongSegment = (props: ISegmentProps) => {
  console.log(props);

  return (
    <Box alignItems='center' mb='1em'>
      <Heading as='h3' size='md' mb='1em' textAlign='center' textTransform='capitalize'>
        {props.name}
      </Heading>

      <Flex direction='column' alignItems='center' gap='1em'>
        {props.patterns.map((pattern, patternIndex) => (
          <Pattern key={patternIndex} {...pattern} />
        ))}
      </Flex>
    </Box>
  );
};
