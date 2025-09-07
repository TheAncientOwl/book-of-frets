/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsPatternSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.11
 * @description Render song pattern segment.
 */

import {
  Box,
  Flex,
  Tag,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  Tooltip,
} from '@chakra-ui/react';

import { useAppStateContext } from '@/context/AppState';
import type { TChordsPatternSegment } from '@/types/song.types';
import { Chord } from '@/components/ChordRenderer/Chord';
import { DefaultSongTheme } from '@/components/SongRenderer/Song';

type TChordsPatternSegmentProps = TChordsPatternSegment & {
  showChordTimes: boolean;
};

const NO_CHORD_ID = '-';

export const ChordsPatternSegment = (props: TChordsPatternSegmentProps) => {
  const { chordsIndex } = useAppStateContext();

  return (
    <Flex direction='column' alignItems='center'>
      <Flex direction='row' gap='1em' mb='0.6em'>
        {props.chordIDs.map((chordId, index) => {
          const chordConfig = chordsIndex[chordId];

          console.assert(chordConfig !== undefined, `Missing chord index for ID '${chordId}'`);

          return (
            <Box as='span' key={index}>
              <Popover>
                <PopoverTrigger>
                  <Tag
                    fontWeight='bold'
                    cursor='pointer'
                    // [*] theme colors
                    backgroundColor={DefaultSongTheme.segments.item.chordsPattern.chord.background}
                    color={DefaultSongTheme.segments.item.chordsPattern.chord.color}
                  >
                    {chordId !== NO_CHORD_ID ? chordConfig.name : '-'}
                  </Tag>
                </PopoverTrigger>

                <PopoverContent
                  // [*] theme colors
                  backgroundColor={
                    DefaultSongTheme.segments.item.chordsPattern.chord.segment.popover.background
                  }
                  borderColor={
                    DefaultSongTheme.segments.item.chordsPattern.chord.segment.popover.border
                  }
                >
                  <PopoverArrow
                    // [*] theme colors
                    backgroundColor={
                      DefaultSongTheme.segments.item.chordsPattern.chord.segment.popover.arrow
                    }
                  />
                  <PopoverCloseButton
                    // [*] theme colors
                    color={
                      DefaultSongTheme.segments.item.chordsPattern.chord.segment.popover.closeButton
                    }
                  />
                  <Flex justifyContent='center' padding='25px'>
                    <Chord name={chordConfig.name} frets={chordConfig.frets} />
                  </Flex>
                </PopoverContent>
              </Popover>
            </Box>
          );
        })}
      </Flex>

      {props.showChordTimes && (
        <Tooltip label={`Strum ${props.chordTimes} times`}>
          <Text
            fontSize='xs'
            fontWeight='bold'
            // [*] theme colors
            color={DefaultSongTheme.segments.item.chordsPattern.chord.segment.times}
          >
            x{props.chordTimes}
          </Text>
        </Tooltip>
      )}

      <Box position='relative' mt='0.4em'>
        <Flex
          direction='row'
          gap='0.5em'
          alignItems='end'
          // [*] theme colors
          color={DefaultSongTheme.segments.item.chordsPattern.chord.segment.pattern}
        >
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
