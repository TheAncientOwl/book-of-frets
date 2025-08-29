/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.4
 * @description Render song segment.
 */

import { Box, Flex, Heading } from '@chakra-ui/react';
import type { TChordsIndex } from '../../configs/types/chord.types.ts';
import type { TSongSegment } from '../../configs/types/song.types.ts';
import { ChordsPattern } from './ChordsPattern.tsx';

type ISongSegmentProps = TSongSegment & {
  showChordTimes: boolean;
  chordsIndex: TChordsIndex;
};

export const SongSegment = (props: ISongSegmentProps) => {
  console.log(props);

  return (
    <Box alignItems='center' mb='1em'>
      <Heading
        as='h3'
        size='md'
        mb='1em'
        textAlign='center'
        textDecoration='underline'
        textTransform='capitalize'
      >
        {props.name}
      </Heading>

      <Flex direction='column' alignItems='center' gap='1em'>
        {props.patterns.map((pattern, patternIndex) => {
          if (props.type === 'chords') {
            return (
              <ChordsPattern
                key={patternIndex}
                {...pattern}
                chordsIndex={props.chordsIndex}
                showChordTimes={props.showChordTimes}
              />
            );
          } else if (props.type === 'strings') {
            return <></>;
          } else {
            console.warn(`Unimplemented pattern type "${props.type}`);
            return <></>;
          }
        })}
      </Flex>
    </Box>
  );
};
