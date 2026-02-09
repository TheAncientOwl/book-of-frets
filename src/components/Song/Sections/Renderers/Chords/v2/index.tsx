/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file CgordsV2.tsx
 * @author Alexandru Delegeanu
 * @version 2.0
 * @description Render song chords section.
 */

import type { TChord } from '@/common/types/chord.types';
import type {
  TChordsV2SectionEntry,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { ChordsV1StrummingPattern } from '@/components/Song/Sections/Renderers/Chords/v1/Item';
import { useShallowAppStore } from '@/store/index';
import { Chord as ChordCard } from '@/ui/Chord/index';
import { Loading } from '@/ui/Loading/index';
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
import { Fragment, lazy, Suspense, type JSX } from 'react';

const ChordsV1Lyrics = lazy(() =>
  import('@/components/Song/Sections/Renderers/Chords/v1/Lyrics').then(mod => ({
    default: mod.ChordsV1Lyrics,
  })),
);

type TChordsSectionProps = {
  data: TChordsV2SectionEntry[];
  strummingPatterns: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
};

const mapPairs = <T, R>(array: T[], callback: (a: T, b: T, index: number) => R): R[] => {
  const result: R[] = [];
  for (let idx = 2; idx < array.length; idx += 2) {
    result.push(callback(array[idx - 1], array[idx], idx - 1));
  }
  return result;
};

const NO_CHORD_ID = '-';
const SEPARATOR_CHORD_CHAR = '|';
const SEPARATOR_CHORD_NEWLINE = '/';

const GAP_BETWEEN_CHORD_LINES = '1em';

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

type TChordsLineProps = {
  data: string[];
  times: string | undefined;
  marginTop: string | undefined;
  isFirst: boolean;
  isLast: boolean;
};

type TChordLineDelimiter = {
  positioning: 'begin' | 'end' | 'between';
};

const ChordLineDelimiter = (props: TChordLineDelimiter) => {
  const { theme } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
  }));

  return (
    <Box
      zIndex={1}
      position={props.positioning !== 'between' ? 'absolute' : 'relative'}
      alignSelf='stretch'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      left={props.positioning === 'begin' ? '-1.5em' : undefined}
      right={props.positioning === 'end' ? '-1.5em' : undefined}
      borderRight={
        props.positioning === 'begin' || props.positioning === 'between' ? '1.5px solid' : 'none'
      }
      borderLeft={props.positioning === 'end' ? '1.5px solid' : 'none'}
      // [*] theme colors
      borderColor={theme.items.item.chordsPattern.divider}
    ></Box>
  );
};

const ChordLineTimes = (props: Pick<TChordsLineProps, 'times'>) => {
  const { theme, settingsDisplaySectionTimes } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    settingsDisplaySectionTimes: state.songSettings.display.sectionTimes,
  }));

  const showTimes = settingsDisplaySectionTimes && props.times !== 'x1';

  return (
    <Tooltip label={`Repeat ${props.times} times`}>
      <Text
        size='sm'
        fontWeight='bold'
        zIndex={1}
        position='absolute'
        right='-3.25em'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        // [*] theme colors
        color={theme.items.item.chordsPattern.chord.times.color}
      >
        {showTimes && <>{props.times}</>}
      </Text>
    </Tooltip>
  );
};

const ChordsLine = (props: TChordsLineProps) => {
  const { theme, chordsIndex } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    chordsIndex: state.chordsIndex,
  }));

  const lines = splitByNewline(props.data);

  return (
    <Flex direction='row' justifyContent='center' position='relative' marginTop={props.marginTop}>
      {props.isFirst && <ChordLineDelimiter positioning='begin' />}
      {props.isLast && <ChordLineDelimiter positioning='end' />}

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

      <ChordLineTimes times={props.times} />
    </Flex>
  );
};

export const ChordsV2Renderer = (props: TChordsSectionProps) => {
  const renderOne = (data: string[]) => {
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
              <ChordLineDelimiter key={betweenSeparator.length} positioning='between' />,
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
              <ChordLineDelimiter key={betweenSeparator.length} positioning='between' />,
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

    return (
      <Flex direction='column' justifyContent='center' alignItems='center' gap='1em'>
        <Flex direction='row' gap='1em'>
          {colsData.map((column, colIdx) => (
            <Fragment key={colIdx}>
              <Flex direction='column'>
                {column.map((line, lineIdx) => {
                  if (line[0] != '>') {
                    return (
                      <ChordsLine
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
              <Flex direction='column' gap={GAP_BETWEEN_CHORD_LINES}>
                {colIdx < colsData.length - 1 ? betweenSeparator : null}
              </Flex>
            </Fragment>
          ))}
        </Flex>

        <Suspense fallback={<Loading />}>
          <ChordsV1Lyrics visible={props.showLyrics} lyrics={props.lyrics} />
        </Suspense>
      </Flex>
    );
  };

  return (
    <Flex direction='column' gap={GAP_BETWEEN_CHORD_LINES}>
      {props.data.map((item, idx) => (
        <Fragment key={idx}>{renderOne(item)}</Fragment>
      ))}
    </Flex>
  );
};
