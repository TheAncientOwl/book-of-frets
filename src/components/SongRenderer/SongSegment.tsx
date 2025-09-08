/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.13
 * @description Render song segment.
 */

import { Box, Flex, Heading, Tag } from '@chakra-ui/react';

import type { TChordsPattern, TSongSegment, TStringsPattern } from '@/types/song.types';

import { ChordsPattern } from '@/components/SongRenderer/ChordsPattern.tsx';
import { StringsPattern } from '@/components/SongRenderer/StringsPattern.tsx';
import { useAppTheme } from '@/context/AppState';

type ISongSegmentProps = TSongSegment & {
  showChordTimes: boolean;
};

export const SongSegmentHeading = (props: ISongSegmentProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Heading
      as='h3'
      size='md'
      textAlign='center'
      textDecoration='underline'
      textTransform='capitalize'
      // [*] theme colors
      color={theme.segments.item.title}
    >
      <Box as='span' position='relative'>
        {props.name}
        {props.times > 1 && (
          <Tag
            size='sm'
            position='absolute'
            bottom={0}
            right={0}
            transform='translate(120%, 20%)'
            // [*] theme colors
            backgroundColor={theme.segments.item.times.background}
            color={theme.segments.item.times.color}
          >
            x{props.times}
          </Tag>
        )}
      </Box>
    </Heading>
  );
};

export const SongSegmentBody = (props: ISongSegmentProps) => {
  return (
    <Flex direction='column' alignItems='center' gap='1em'>
      {props.patterns.map((pattern, patternIndex) => {
        if (props.type === 'chords') {
          return (
            <ChordsPattern
              key={patternIndex}
              {...(pattern as TChordsPattern)}
              showChordTimes={props.showChordTimes}
            />
          );
        } else if (props.type === 'strings') {
          return (
            <StringsPattern
              key={patternIndex}
              {...(pattern as TStringsPattern)}
              showChordTimes={props.showChordTimes}
            />
          );
        } else {
          console.warn(`Unimplemented pattern type "${props.type}`);
          return <></>;
        }
      })}
    </Flex>
  );
};
