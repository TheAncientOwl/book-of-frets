/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsPatternSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.9
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
                  <Tag backgroundColor='green.200' fontWeight='bold' cursor='pointer'>
                    {chordId !== NO_CHORD_ID ? chordConfig.name : '-'}
                  </Tag>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
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
          <Text fontSize='xs' fontWeight='bold'>
            x{props.chordTimes}
          </Text>
        </Tooltip>
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
