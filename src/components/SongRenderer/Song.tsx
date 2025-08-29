/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description Render song based on given config.
 */

import { Box, Circle, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import type { TChordsIndex } from '../../configs/types/chord.types.ts';
import type { TChordsPattern, TSong } from '../../configs/types/song.types.ts';
import { SongSegment } from './SongSegment';

type TSongProps = TSong & {
  chordsIndex: TChordsIndex;
};

export const Song = (props: TSongProps) => {
  return (
    <Box bgColor='blue.300' padding='2em 1em'>
      <Heading as='h1' size='lg' mb='0.5em' textAlign='center'>
        <Box as='span' position='relative'>
          {props.title}

          <Circle
            position='absolute'
            right='0'
            top='-5px'
            transform='translateX(120%)'
            size='1em'
            padding='15px'
            bg='blue.300'
            color='blue.900'
            fontWeight='bold'
            borderColor='blue.900'
            borderWidth='thin'
          >
            <Flex alignItems='end'>
              <Text fontSize='sm'>C</Text>
              <Text fontSize='xs'>{props.capo}</Text>
            </Flex>
          </Circle>
        </Box>
      </Heading>

      <Heading as='h2' size='sm' mb='0.5em' textAlign='center'>
        {props.artists.map((artist, index) => (
          <React.Fragment key={index}>
            {artist}
            {index < props.artists.length - 1 && ', '}
          </React.Fragment>
        ))}
      </Heading>

      <Box bgColor='blue.400' padding='1.5em 1em'>
        {props.songSegmentsOrder.map((songSegmentName, index) => {
          const songSegmentData = props.songSegments[songSegmentName];
          console.assert(
            songSegmentData !== undefined,
            `Failed to find song segment data for "${songSegmentName}"`
          );
          return (
            <React.Fragment key={`${songSegmentName}-${index}`}>
              <SongSegment
                {...songSegmentData}
                chordsIndex={props.chordsIndex}
                showChordTimes={Object.entries(props.songSegments).some(
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ([_, value]) =>
                    value.type === 'chords' &&
                    (value.patterns as TChordsPattern[]).some(pattern =>
                      pattern.segments.some(segment => segment.chordTimes > 1)
                    )
                )}
              />
              <Divider mb='1em' />
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
