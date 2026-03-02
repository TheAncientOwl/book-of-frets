/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsV2LineRenderer.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description .
 */

import type { TChord } from '@/common/types/chord.types';
import type { TChordsV2SectionData } from '@/common/types/song.types';
import { ChordsV1StrummingPattern } from '@/components/Song/Sections/Renderers/Chords/v1/Item';
import type { TChordsSectionProps } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2';
import { ChordsV2LineDelimiter } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2LineDelimiter';
import { ChordsV2LineTimes } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2LineTimes';
import { ChordV2Display } from '@/components/Song/Sections/Renderers/Chords/v2/ChordV2Display';
import { GAP_BETWEEN_CHORD_LINES } from '@/components/Song/Sections/SongSection';
import { useShallowAppStore } from '@/store/index';
import { Chord as ChordCard } from '@/ui/Chord/Chord';
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
import { Fragment, type JSX } from 'react';

type TChordsV2LineRendererProps = Pick<TChordsSectionProps, 'data' | 'strummingPatterns'>;

const chordsV2ParseData = (data: TChordsV2SectionData) => {
  const colsData = new Array<Array<string>>();
  const times = new Array<string>();
  const betweenSeparator = new Array<JSX.Element>();

  data.forEach(item => {
    switch (item[0]) {
      case 'x': {
        if (item.includes(' ! 0')) {
          item.split(' ! 0 ').forEach((column, idx) => {
            if (colsData.length <= idx) {
              colsData.push(new Array<string>());
            }
            colsData[idx].push(idx === 0 ? column : `x1 ${column}`);
          });
          betweenSeparator.push(
            <ChordsV2LineDelimiter key={betweenSeparator.length} positioning='between' />,
          );
        } else if (item.includes(' ? 0 ')) {
          item.split(' ? 0 ').forEach((column, idx) => {
            if (colsData.length <= idx) {
              colsData.push(new Array<string>());
            }
            colsData[idx].push(idx === 0 ? column : `x1 ${column}`);
          });
          betweenSeparator.push(<Box key={betweenSeparator.length} height='100%' />);
        } else {
          if (colsData.length === 0) {
            colsData.push(new Array<string>());
          }
          colsData[0].push(item);
          betweenSeparator.push(
            <ChordsV2LineDelimiter key={betweenSeparator.length} positioning='between' />,
          );
        }
        times.push(item.substring(0, item.indexOf(' ')));

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

        times.push(' ');

        betweenSeparator.push(<Box key={betweenSeparator.length} height='100%' />);

        break;
      }
      default: {
        console.error(`Not handled chords-v2 string "${item}"`);
        return null;
      }
    }
  });

  return { colsData, times, betweenSeparator };
};

const SEPARATOR_CHORD_CHAR = '|';
const SEPARATOR_CHORD_NEWLINE = '/';

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

const mapPairs = <T, R>(array: T[], callback: (a: T, b: T, index: number) => R): R[] => {
  const result: R[] = [];
  for (let idx = 2; idx < array.length; idx += 2) {
    result.push(callback(array[idx - 1], array[idx], idx - 1));
  }
  return result;
};

const NO_CHORD_ID = '-';

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
          mt='10px'
          as='button'
          fontWeight='bold'
          cursor='pointer'
          position='relative'
          whiteSpace='nowrap'
          // [*] theme colors
          backgroundColor={theme.items.item.chordsPattern.chord.background}
          color={theme.items.item.chordsPattern.chord.color}
        >
          {props.chordId !== NO_CHORD_ID && props.chordConfig !== undefined ? (
            <ChordV2Display name={props.chordConfig.name} />
          ) : (
            '-'
          )}
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

export type TChordsLineProps = {
  data: string[];
  times: string | undefined;
  marginTop: string | undefined;
  isFirst: boolean;
  isLast: boolean;
};

const ChordsV2Line = (props: TChordsLineProps) => {
  const { theme, chordsIndex } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    chordsIndex: state.chordsIndex,
  }));

  const lines = splitByNewline(props.data);

  return (
    <Flex direction='row' justifyContent='center' position='relative' marginTop={props.marginTop}>
      {props.isFirst && <ChordsV2LineDelimiter positioning='begin' />}
      {props.isLast && <ChordsV2LineDelimiter positioning='end' />}

      <Flex direction='column' gap={GAP_BETWEEN_CHORD_LINES}>
        {lines.map((line, lineIdx) => (
          <Flex
            key={lineIdx}
            direction='row'
            gap='1em'
            justifyContent='center'
            alignItems='center'
            position='relative'
          >
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

              return (
                <Chord key={index} chordId={chordId} chordConfig={chordConfig} times={times} />
              );
            })}
          </Flex>
        ))}
      </Flex>

      <ChordsV2LineTimes times={props.times} />
    </Flex>
  );
};

export const ChordsV2LineRenderer = (props: TChordsV2LineRendererProps) => {
  const { colsData, times, betweenSeparator } = chordsV2ParseData(props.data);

  return (
    <Flex direction='row' gap={GAP_BETWEEN_CHORD_LINES}>
      {colsData.map((column, colIdx) => (
        <Fragment key={colIdx}>
          <Flex direction='column' flex={1}>
            {column.map((line, lineIdx) => {
              if (line[0] != '>') {
                return (
                  <ChordsV2Line
                    isFirst={colIdx === 0}
                    isLast={colIdx === colsData.length - 1}
                    marginTop={lineIdx !== 0 ? GAP_BETWEEN_CHORD_LINES : '0'}
                    key={lineIdx}
                    data={line.split(' ').slice(0)}
                    times={colIdx === colsData.length - 1 ? times[lineIdx] : undefined}
                  />
                );
              } else {
                return (
                  <ChordsV1StrummingPattern
                    key={lineIdx}
                    pattern={props.strummingPatterns[Number(line.substring(1))]}
                  />
                );
              }
            })}
          </Flex>
          {colIdx < colsData.length - 1 ? (
            <Flex direction='column' gap={GAP_BETWEEN_CHORD_LINES}>
              {betweenSeparator}
            </Flex>
          ) : null}
        </Fragment>
      ))}
    </Flex>
  );
};
