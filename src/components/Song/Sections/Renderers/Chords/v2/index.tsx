/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file index.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render song chords section.
 */

import type { TChord } from '@/common/types/chord.types';
import type { TChordsSectionItem, TStrummingPattern } from '@/common/types/song.types';
import { ChordsV1StrummingPattern } from '@/components/Song/Sections/Renderers/Chords/v1/Item';
import { useShallowAppStore } from '@/store/index';
import { Chord as ChordCard } from '@/ui/Chord/index';
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

type TChordsSectionProps = {
  data: TChordsSectionItem[];
  strummingPatterns: TStrummingPattern[];
};

const mapPairs = <T, R>(array: T[], callback: (a: T, b: T, index: number) => R): R[] => {
  const result: R[] = [];
  for (let idx = 2; idx < array.length; idx += 2) {
    result.push(callback(array[idx - 1], array[idx], idx - 1));
  }
  return result;
};

type TChordsLineProps = {
  data: string[];
};

const NO_CHORD_ID = '-';
const SEPARATOR_CHORD_CHAR = '|';
const SEPARATOR_CHORD_NEWLINE = '/';

type TChordProps = {
  chordId: string;
  chordConfig: TChord;
  times: string;
};

const Chord = (props: TChordProps) => {
  const { theme, songSettings } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    songSettings: state.songSettings,
  }));

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Tag
        mt='0.85em'
          as='button'
          fontWeight='bold'
          cursor='pointer'
          position='relative'
          whiteSpace='nowrap'
          // [*] theme colors
          backgroundColor={theme.items.item.chordsPattern.chord.background}
          color={theme.items.item.chordsPattern.chord.color}
        >
          {props.chordId !== NO_CHORD_ID && props.chordConfig !== undefined
            ? props.chordConfig.name
            : '-'}
          {songSettings.display.chordTimes &&
            (props.times !== '1' || songSettings.display.chordTimesOne) && (
              <Tooltip label={`Strum ${props.times} times`}>
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
                  {props.times}
                </Text>
              </Tooltip>
            )}
        </Tag>
      </PopoverTrigger>

      <Portal>
        {props.chordConfig && (
          <PopoverContent
            // [*] theme colors
            zIndex={1}
            backgroundColor={theme.items.item.chordsPattern.chord.section.popover.background}
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
              <ChordCard {...props.chordConfig} />
            </Flex>
          </PopoverContent>
        )}
      </Portal>
    </Popover>
  );
};

const splitByNewline = (data: string[]): string[][] => {
  const lines: string[][] = [[]];

  data.forEach(item => {
    if (item === SEPARATOR_CHORD_NEWLINE) {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(item);
    }
  });

  return lines;
};

const ChordsLine = (props: TChordsLineProps) => {
  const { theme, chordsIndex } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    chordsIndex: state.chordsIndex,
  }));

  const lines = splitByNewline(props.data);

  return (
    <Flex direction='column' gap='0.85em'>
      {lines.map((line, lineIdx) => (
        <Flex key={lineIdx} direction='row' gap='1em' justifyContent='center'>
          {mapPairs(line, (chordId, times, index) => {
            if (chordId === SEPARATOR_CHORD_CHAR) {
              return (
                <Divider
                  key={index}
                  height='22px'
                  width='0px'
                  borderWidth='thin'
                  borderColor={theme.items.divider}
                />
              );
            }

            const chordConfig = chordsIndex[chordId];

            return <Chord key={index} chordId={chordId} chordConfig={chordConfig} times={times} />;
          })}
        </Flex>
      ))}
    </Flex>
  );
};

export const ChordsSection = (props: TChordsSectionProps) => {
  const colsData = new Array<Array<string>>();

  props.data.forEach(item => {
    switch (item[0]) {
      case 'x': {
        if (item.includes(' ! 0')) {
          item.split(' ! 0 ').forEach((column, idx) => {
            if (colsData.length <= idx) {
              colsData.push(new Array<string>());
            }
            colsData[idx].push(idx === 0 ? column : `x1 ${column}`);
          });
        } else if (item.includes(' ? 0 ')) {
          item.split(' ? 0 ').forEach((column, idx) => {
            if (colsData.length <= idx) {
              colsData.push(new Array<string>());
            }
            colsData[idx].push(idx === 0 ? column : `x1 ${column}`);
          });
        } else {
          if (colsData.length === 0) {
            colsData.push(new Array<string>());
          }
          colsData[0].push(item);
        }
        break;
      }
      case '>': {
        item
          .split(' ')
          .slice(1)
          .forEach((patternId, idx) => {
            if (colsData.length <= idx) {
              colsData.push(new Array<string>());
            }

            colsData[idx].push(`> ${patternId}`);
          });
        break;
      }
      default: {
        console.error(`Not handled chords-v2 string "${item}"`);
        return null;
      }
    }
  });

  return (
    <Box color='white'>
      <Flex direction='row' gap='1em'>
        {colsData.map((colData, idx) => (
          <Flex key={idx} direction='column'>
            {colData.map((item, idx) => {
              if (item[0] != '>') {
                const data = item.split(' ');
                // TODO: Display times
                // const times = data[0];
                const chordIds = data.slice(0);

                return <ChordsLine key={idx} data={chordIds} />;
              } else {
                return (
                  <ChordsV1StrummingPattern
                    key={idx}
                    pattern={props.strummingPatterns[Number(item.substring(1))]}
                  />
                );
              }
            })}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
