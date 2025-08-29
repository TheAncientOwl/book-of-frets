/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Render song segment.
 */

import { Box, Flex, Heading } from '@chakra-ui/react';
import { Pattern } from './Pattern';
import type { ISongSegment } from '../../configs/types/song.types.ts';
import type { TChordsIndex } from '../../configs/types/chord.types.ts';

interface ISongSegmentProps extends ISongSegment {
  showChordTimes: boolean;
  chordsIndex: TChordsIndex;
}

export const SongSegment = (props: ISongSegmentProps) => {
  console.log(props);

  return (
    <Box alignItems='center' mb='1em'>
      <Heading as='h3' size='md' mb='1em' textAlign='center' textTransform='capitalize'>
        {props.name}
      </Heading>

      <Flex direction='column' alignItems='center' gap='1em'>
        {props.patterns.map((pattern, patternIndex) => (
          <Pattern
            key={patternIndex}
            {...pattern}
            chordsIndex={props.chordsIndex}
            showChordTimes={props.showChordTimes}
          />
        ))}
      </Flex>
    </Box>
  );
};
