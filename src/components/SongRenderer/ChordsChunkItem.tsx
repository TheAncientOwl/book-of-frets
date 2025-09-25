/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunkItem.tsx
 * @author Alexandru Delegeanu
 * @version 0.18
 * @description Render song pattern segment.
 */

import type { TChordsChunkItem } from '@/common/types/song.types';
import { Chord } from '@/components/ChordRenderer/Chord';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';

type TChordsChunkItemProps = TChordsChunkItem & {};

const EMPHASIZE_STRUMS = ['De', 'Ue'];
const EMPHASIZE_STRUM_CHAR = 'e';

const NO_CHORD_ID = '-';

export const ChordsChunkItem = (props: TChordsChunkItemProps) => {
  const { song: theme } = useAppTheme();
  const { chordsIndex, songSettings } = useAppState();

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
                    backgroundColor={theme.chunks.item.chordsPattern.chord.background}
                    color={theme.chunks.item.chordsPattern.chord.color}
                  >
                    {chordId !== NO_CHORD_ID ? chordConfig.name : '-'}
                  </Tag>
                </PopoverTrigger>

                <Portal>
                  <PopoverContent
                    // [*] theme colors
                    zIndex={1}
                    backgroundColor={
                      theme.chunks.item.chordsPattern.chord.segment.popover.background
                    }
                    borderColor={theme.chunks.item.chordsPattern.chord.segment.popover.border}
                  >
                    <PopoverArrow
                      // [*] theme colors
                      backgroundColor={theme.chunks.item.chordsPattern.chord.segment.popover.arrow}
                    />
                    <PopoverCloseButton
                      // [*] theme colors
                      color={theme.chunks.item.chordsPattern.chord.segment.popover.closeButton}
                    />
                    <Flex justifyContent='center' padding='25px'>
                      <Chord name={chordConfig.name} frets={chordConfig.frets} />
                    </Flex>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Box>
          );
        })}
      </Flex>

      {songSettings.display.chordTimes.value && (
        <Tooltip label={`Strum ${props.chordTimes} times`}>
          <Text
            fontSize='xs'
            fontWeight='bold'
            // [*] theme colors
            color={theme.chunks.item.chordsPattern.chord.segment.times}
          >
            x{props.chordTimes}
          </Text>
        </Tooltip>
      )}

      {songSettings.display.strummingPattern.value && (
        <Box position='relative' mt='0.4em'>
          <Flex
            direction='row'
            gap='0.5em'
            alignItems='end'
            // [*] theme colors
            color={theme.chunks.item.chordsPattern.chord.segment.pattern}
          >
            {props.strummingPattern.map((pattern, index) => {
              return (
                <Text
                  key={index}
                  fontWeight='bold'
                  textDecoration={EMPHASIZE_STRUMS.includes(pattern) ? 'underline' : 'none'}
                >
                  {pattern.replace(EMPHASIZE_STRUM_CHAR, '')}
                </Text>
              );
            })}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
