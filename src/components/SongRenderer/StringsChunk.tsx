/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file StringsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.20
 * @description Render song strings pattern.
 */

import type { TGuitarString } from '@/common/types/common.types';
import type { TGuitarStringDelimiter, TStringsChunk } from '@/common/types/song.types';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Circle, Divider, Flex, Heading, Text } from '@chakra-ui/react';

type TStringsPatternProps = TStringsChunk & {};

type TFretNumber = number | TGuitarStringDelimiter;

type TStringProps = {
  name: string;
  frets: TFretNumber[];
};

const String = (props: TStringProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Flex direction='row' alignItems='center' position='relative'>
      <Heading
        size='md'
        position='sticky'
        left='0'
        zIndex={5}
        borderRadius='5px'
        padding='3px 6px'
        width='2ch'
        textAlign='center'
        // [*] theme colors
        color={theme.chunks.item.stringsPattern.stringNames}
        backgroundColor='blackAlpha.600'
      >
        {props.name}
      </Heading>

      <Flex direction='row' position='absolute' left='30px' alignItems='center' gap='5px' ml='5px'>
        {props.frets.map((fret, index) => {
          if (fret === '-') {
            return (
              <Box key={index} width='1.2em'>
                <Divider
                  borderWidth='thin'
                  // [*] theme colors
                  borderColor={theme.chunks.item.stringsPattern.filler}
                />
              </Box>
            );
          } else if (fret === '|') {
            return (
              <Box
                key={index}
                // [*] theme colors
                color={theme.chunks.item.stringsPattern.filler}
              >
                |
              </Box>
            );
          } else {
            return (
              <Box key={index} width='1.2em'>
                <Circle
                  key={index}
                  padding='0.6em'
                  size='1em'
                  fontWeight='bold'
                  borderWidth='thin'
                  // [*] theme colors
                  backgroundColor={theme.chunks.item.stringsPattern.fret.background}
                  borderColor={theme.chunks.item.stringsPattern.fret.border}
                  color={theme.chunks.item.stringsPattern.fret.text}
                >
                  <Text fontSize='sm'>{fret}</Text>
                </Circle>
              </Box>
            );
          }
        })}
      </Flex>
    </Flex>
  );
};

const StringToNumber = {
  E: 0,
  A: 1,
  D: 2,
  G: 3,
  B: 4,
  e: 5,
};

export const StringsChunk = (props: TStringsPatternProps) => {
  const { song: theme } = useAppTheme();
  const stringsToFrets = [[], [], [], [], [], []] as TFretNumber[][];

  props.items.forEach(item => {
    if (typeof item === 'string') {
      stringsToFrets.forEach(arr => arr.push(item));
      return;
    }

    Object.entries(item).forEach(([string, fret]) => {
      stringsToFrets[StringToNumber[string as TGuitarString]].push(fret);
    });

    const newMax = Math.max(...stringsToFrets.map(arr => arr.length));
    stringsToFrets.forEach(arr => {
      if (arr.length != newMax) {
        arr.push('-');
      }
    });
  });

  return (
    <Flex direction='column' gap='0.5em' width='100%' overflow='scroll'>
      <String name='e' frets={stringsToFrets[5]} />
      <String name='B' frets={stringsToFrets[4]} />
      <String name='G' frets={stringsToFrets[3]} />
      <String name='D' frets={stringsToFrets[2]} />
      <String name='A' frets={stringsToFrets[1]} />
      <String name='E' frets={stringsToFrets[0]} />
      <Divider
        // [*] theme colors
        borderColor={theme.chunks.item.stringsPattern.divider}
      />
    </Flex>
  );
};
