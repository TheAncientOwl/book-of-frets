/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file FingerStyleChords.tsx
 * @author Alexandru Delegeanu
 * @version 0.29
 * @description Render song strings pattern.
 */

import type { TFingerStyleSectionData } from '@/common/types/song.types';
import { useAppStore } from '@/store/index';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

type TFretNumber = number | string;

type TStringProps = {
  name: string;
  frets: TFretNumber[];
};

const String = ({ name, frets }: TStringProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <Flex align='center'>
      <Box
        position='sticky'
        left='0'
        zIndex={5}
        backgroundColor='blackAlpha.700'
        px='1'
        fontWeight='bold'
        color={theme.items.item.stringsPattern.stringNames}
        fontFamily='monospace'
      >
        {name}
      </Box>
      <Text
        backgroundColor='blackAlpha.200'
        fontFamily='monospace'
        whiteSpace='pre'
        color={theme.items.item.stringsPattern.fret.text}
      >
        {frets}
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
  const theme = useAppStore(state => state.appTheme.song);

  const mappedChords = chords
    .map((chord, index) => {
      if (index === 0) {
        return chord.name;
      }

      return (
        ' '.repeat(chord.offset - chords[index - 1].offset - chords[index - 1].name.length) +
        chord.name
      );
    })
    .join('');

  return (
    <Text
      ml='3ch'
      fontFamily='monospace'
      whiteSpace='pre'
      color={theme.items.item.stringsPattern.stringNames}
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

  let chordOffset: number = 0;
  items.split(' ').map(item => {
    if (item === '-' || item === '|') {
      asValues.forEach(entry => entry.push(item));
      chordOffset += 1;
      return;
    }

    if (item.charAt(0) === '[') {
      chords.push({ name: item.slice(1, item.length - 1), offset: chordOffset });
      return;
    }

    let newStringSize: number | undefined = undefined;
    let fillLength: number = 0;
    item.split('+').map(chord => {
      const arr = stringsToFrets[chord.charAt(0) as keyof typeof stringsToFrets];

      const fret = chord.slice(1);
      fillLength = Math.max(fillLength, fret.length);

      arr.push(fret);
      newStringSize = arr.length;
    });

    if (newStringSize !== undefined) {
      asValues.forEach(entry => {
        if (entry.length < (newStringSize as number)) {
          entry.push('-'.repeat(fillLength));
        }
      });
      chordOffset += fillLength;
    }
  });

  asValues.forEach(arr => arr.push('|'));

  return { stringsToFrets, chords };
};

export const FingerStyleChords = (props: TFingerStyleSectionData) => {
  const theme = useAppStore(state => state.appTheme.song);

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
          borderColor={theme.items.item.stringsPattern.divider}
        />
      </Box>
    </Flex>
  );
};
