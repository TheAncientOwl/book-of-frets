/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunkItem.tsx
 * @author Alexandru Delegeanu
 * @version 0.25
 * @description Render song pattern segment.
 */

import type { TChordsChunkItem, TStrummingPattern } from '@/common/types/song.types';
import { Chord } from '@/components/ChordRenderer/Chord';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import {
  Box,
  Divider,
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

type TChordsChunkItemProps = TChordsChunkItem & {
  strumms: TStrummingPattern[];
};

const EMPHASIZE_STRUMS = ['De', 'Ue'];
const EMPHASIZE_STRUM_CHAR = 'e';
const SEPARATOR_CHORD_CHAR = '|';
const NO_CHORD_ID = '-';

export const ChordsChunkItem = (props: TChordsChunkItemProps) => {
  const { song: theme } = useAppTheme();
  const { chordsIndex, songSettings } = useAppState();

  if (props.strumm >= props.strumms.length) {
    console.error({
      message: `Found strum index ${props.strumm} when strumms length is ${props.strumms.length}`,
      strumms: props.strumms,
    });
    return null;
  }

  return (
    <Flex direction='column' alignItems='center' justifyContent='flex-end'>
      <Flex direction='column' gap='5px' alignItems={props.align || 'center'}>
        {props.chordIDs.map((chordIDsLine, index) => {
          return (
            <Flex key={index} direction='row' gap='1em' mb='0.6em'>
              {chordIDsLine.map((chordId, index) => {
                if (chordId === SEPARATOR_CHORD_CHAR) {
                  return (
                    <Divider
                      height='22px'
                      borderWidth='thin'
                      // [*] theme colors
                      borderColor={theme.chunks.divider}
                    />
                  );
                }

                const chordConfig = chordsIndex[chordId];

                if (chordConfig === undefined) {
                  console.error(`Missing chord index for ID '${chordId}'`);
                }

                return (
                  <Box as='span' key={index}>
                    <Popover isLazy>
                      <PopoverTrigger>
                        <Tag
                          as='button'
                          fontWeight='bold'
                          cursor='pointer'
                          // [*] theme colors
                          backgroundColor={theme.chunks.item.chordsPattern.chord.background}
                          color={theme.chunks.item.chordsPattern.chord.color}
                        >
                          {chordId !== NO_CHORD_ID && chordConfig !== undefined
                            ? chordConfig.name
                            : '-'}
                        </Tag>
                      </PopoverTrigger>
                      <Portal>
                        {chordConfig && (
                          <PopoverContent
                            // [*] theme colors
                            zIndex={1}
                            backgroundColor={
                              theme.chunks.item.chordsPattern.chord.segment.popover.background
                            }
                            borderColor={
                              theme.chunks.item.chordsPattern.chord.segment.popover.border
                            }
                          >
                            <PopoverArrow
                              // [*] theme colors
                              backgroundColor={
                                theme.chunks.item.chordsPattern.chord.segment.popover.arrow
                              }
                            />
                            <PopoverCloseButton
                              // [*] theme colors
                              color={
                                theme.chunks.item.chordsPattern.chord.segment.popover.closeButton
                              }
                            />
                            <Flex justifyContent='center' padding='25px'>
                              <Chord {...chordConfig} />
                            </Flex>
                          </PopoverContent>
                        )}
                      </Portal>
                    </Popover>
                  </Box>
                );
              })}
            </Flex>
          );
        })}
      </Flex>

      {songSettings.display.chordTimes.value && (
        <Tooltip label={`Strum ${props.times} times`}>
          <Text
            fontSize='xs'
            fontWeight='bold'
            // [*] theme colors
            color={theme.chunks.item.chordsPattern.chord.segment.times}
          >
            x{props.times}
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
            {props.strumms[props.strumm].map((pattern, index) => {
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
