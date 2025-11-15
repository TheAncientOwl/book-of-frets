/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunkItem.tsx
 * @author Alexandru Delegeanu
 * @version 0.29
 * @description Render song pattern section.
 */

import type { TChordsChunkItem, TStrummingPattern } from '@/common/types/song.types';
import { Chord } from '@/ui/Chord';
import { useAppStore, useShallowAppStore } from '@/store/index';
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

type TChordsChunkItemProps = {
  data: TChordsChunkItem;
  strumms: TStrummingPattern[];
};

const EMPHASIZE_STRUMS = ['De', 'Ue'];
const EMPHASIZE_STRUM_CHAR = 'e';
const SEPARATOR_CHORD_CHAR = '|';
const NO_CHORD_ID = '-';

const mapPairs = <T, R>(array: T[], callback: (a: T, b: T, index: number) => R): R[] => {
  const result: R[] = [];
  for (let idx = 2; idx < array.length; idx += 2) {
    result.push(callback(array[idx - 1], array[idx], idx - 1));
  }
  return result;
};

type TItemLineProps = {
  data: string[];
  strummingPattern: TStrummingPattern;
  showPattern: boolean;
};

const ItemLine = (props: TItemLineProps) => {
  const { theme, chordsIndex, songSettings } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    chordsIndex: state.chordsIndex,
    songSettings: state.songSettings,
  }));

  return (
    <Flex direction='column' justifyContent='center' alignItems='center' gap='0.5rem'>
      <Flex direction='row' gap='20px'>
        {mapPairs(props.data, (chordId, times, index) => {
          if (chordId === SEPARATOR_CHORD_CHAR) {
            return (
              <Divider
                height='22px'
                borderWidth='thin'
                // [*] theme colors
                borderColor={theme.items.divider}
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
                    position='relative'
                    // [*] theme colors
                    backgroundColor={theme.items.item.chordsPattern.chord.background}
                    color={theme.items.item.chordsPattern.chord.color}
                  >
                    {chordId !== NO_CHORD_ID && chordConfig !== undefined ? chordConfig.name : '-'}
                    {songSettings.display.chordTimes &&
                      (times !== '1' || songSettings.display.chordTimesOne) && (
                        <Tooltip label={`Strum ${times} times`}>
                          <Text
                            position='absolute'
                            top='-10px'
                            right='0'
                            transform='translateX(100%)'
                            fontSize='xs'
                            fontWeight='bold'
                            // [*] theme colors
                            color={theme.items.item.chordsPattern.chord.section.times}
                          >
                            {times}
                          </Text>
                        </Tooltip>
                      )}
                  </Tag>
                </PopoverTrigger>

                <Portal>
                  {chordConfig && (
                    <PopoverContent
                      // [*] theme colors
                      zIndex={1}
                      backgroundColor={
                        theme.items.item.chordsPattern.chord.section.popover.background
                      }
                      borderColor={theme.items.item.chordsPattern.chord.section.popover.border}
                    >
                      <PopoverArrow
                        // [*] theme colors
                        backgroundColor={theme.items.item.chordsPattern.chord.section.popover.arrow}
                      />
                      <PopoverCloseButton
                        // [*] theme colors
                        color={theme.items.item.chordsPattern.chord.section.popover.closeButton}
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

      {props.showPattern && songSettings.display.strummingPattern && (
        <Box position='relative' mt='0.4em'>
          <Flex
            direction='row'
            gap='0.5em'
            alignItems='end'
            // [*] theme colors
            color={theme.items.item.chordsPattern.chord.section.pattern}
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

export const StrummingChordsItem = (props: TChordsChunkItemProps) => {
  const settingsDisplayChordTimesOne = useAppStore(
    state => state.songSettings.display.chordTimesOne
  );

  const linesData = props.data.map(lineData => lineData.split(' '));

  const samePattern =
    linesData.length === 0 || linesData.every(lineData => lineData[0] === linesData[0][0]);

  return (
    <Flex
      direction={samePattern ? 'column' : 'row'}
      alignItems='center'
      justifyContent='center'
      gap={settingsDisplayChordTimesOne ? '1.5rem' : '1rem'}
    >
      {linesData.map((lineData, index) => {
        const strumm = Number(lineData[0]);

        if (strumm >= props.strumms.length) {
          console.error({
            message: `Found strum index ${strumm} when strumms length is ${props.strumms.length}`,
            strumms: props.strumms,
          });
          return null;
        }

        return (
          <ItemLine
            key={index}
            data={lineData}
            strummingPattern={props.strumms[strumm]}
            showPattern={
              index === linesData.length - 1 ? true : strumm !== Number(linesData[index + 1][0])
            }
          />
        );
      })}
    </Flex>
  );
};
