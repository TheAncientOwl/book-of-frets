/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file StringsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.25
 * @description Render song strings pattern.
 */

import type { TStringsChunk } from '@/common/types/song.types';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

type TStringsPatternProps = TStringsChunk & {};

type TFretNumber = number | string;

type TStringProps = {
  name: string;
  frets: TFretNumber[];
};

const CELL_WIDTH = 3;

const String = ({ name, frets }: TStringProps) => {
  const { song: theme } = useAppTheme();

  const mappedFrets = frets
    .map(fret => {
      if (fret === '-') return '─'.repeat(CELL_WIDTH);
      if (fret === '|') return '│';
      return fret.toString().padStart(2, ' ').padEnd(CELL_WIDTH, ' ');
    })
    .join('');

  return (
    <Flex align='center'>
      <Box
        position='sticky'
        left='0'
        zIndex={5}
        backgroundColor='blackAlpha.700'
        px='1'
        fontWeight='bold'
        color={theme.chunks.item.stringsPattern.stringNames}
        fontFamily='monospace'
      >
        {name}
      </Box>
      <Text
        backgroundColor='blackAlpha.200'
        fontFamily='monospace'
        whiteSpace='pre'
        color={theme.chunks.item.stringsPattern.fret.text}
      >
        {mappedFrets}
      </Text>
    </Flex>
  );
};

type TDisplayChord = {
  name: string;
  offset: number;
};

type TDisplayChordsProps = {
  chords: TDisplayChord[];
};

const DisplayChords = ({ chords }: TDisplayChordsProps) => {
  const { song: theme } = useAppTheme();

  console.log(JSON.stringify(chords));

  const mappedChords = chords
    .map((chord, index) => {
      if (index === 0) {
        return chord.name;
      }

      return chord.name.padStart(
        (chord.offset - chords[index - 1].offset) * CELL_WIDTH - chords[index - 1].name.length,
        ' '
      );
    })
    .join('');

  return (
    <Text
      ml='3ch'
      fontFamily='monospace'
      whiteSpace='pre'
      color={theme.chunks.item.stringsPattern.stringNames}
    >
      {mappedChords}
    </Text>
  );
};

type TStringToFrets = {
  e: TFretNumber[];
  B: TFretNumber[];
  G: TFretNumber[];
  D: TFretNumber[];
  A: TFretNumber[];
  E: TFretNumber[];
};

const parseItems = (items: string): { stringsToFrets: TStringToFrets; chords: TDisplayChord[] } => {
  const stringsToFrets: TStringToFrets = {
    E: ['|'] as TFretNumber[],
    A: ['|'] as TFretNumber[],
    D: ['|'] as TFretNumber[],
    G: ['|'] as TFretNumber[],
    B: ['|'] as TFretNumber[],
    e: ['|'] as TFretNumber[],
  };
  const chords: TDisplayChord[] = [] as TDisplayChord[];

  const asValues = Object.values(stringsToFrets);

  items.split(' ').map((item, index) => {
    if (item === '-' || item === '|') {
      asValues.forEach(entry => entry.push(item));
      return;
    }

    if (item.charAt(0) === '[') {
      console.log(item);
      chords.push({ name: item.slice(1, item.length - 1), offset: index });
      return;
    }

    let newSize: number | undefined = undefined;
    item.split('+').map(chord => {
      const arr = stringsToFrets[chord.charAt(0) as keyof typeof stringsToFrets];
      arr.push(chord.slice(1));
      newSize = arr.length;
    });

    if (newSize !== undefined) {
      asValues.forEach(entry => {
        if (entry.length < (newSize as number)) {
          entry.push('-');
        }
      });
    }
  });

  asValues.forEach(arr => arr.push('|'));

  return { stringsToFrets, chords };
};

export const StringsChunk = (props: TStringsPatternProps) => {
  const { song: theme } = useAppTheme();

  const { stringsToFrets, chords } = parseItems(props.items);

  return (
    <Flex direction='column' width='100%' overflowX='auto' fontSize={['1.2em']}>
      <Box minWidth='max-content'>
        {chords.length > 0 && <DisplayChords chords={chords} />}
        <String name='e' frets={stringsToFrets.e} />
        <String name='B' frets={stringsToFrets.B} />
        <String name='G' frets={stringsToFrets.G} />
        <String name='D' frets={stringsToFrets.D} />
        <String name='A' frets={stringsToFrets.A} />
        <String name='E' frets={stringsToFrets.E} />
        <Divider
          marginTop='1em'
          // [*] theme colors
          borderColor={theme.chunks.item.stringsPattern.divider}
        />
      </Box>
    </Flex>
  );
};
