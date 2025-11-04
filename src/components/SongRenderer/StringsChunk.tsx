/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file StringsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.23
 * @description Render song strings pattern.
 */

import type { TStringsChunk } from '@/common/types/song.types';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Circle, Divider, Flex, Heading, Text } from '@chakra-ui/react';

type TStringsPatternProps = TStringsChunk & {};

type TFretNumber = number | string;

type TStringProps = {
  name: string;
  frets: TFretNumber[];
};

const String = (props: TStringProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Flex direction='row' alignItems='center' position='relative'>
      <Heading
        size='xs'
        position='sticky'
        left='0'
        zIndex={5}
        borderRadius='0.1em'
        padding='0.3em 0.7em'
        textAlign='center'
        width='2ch'
        display='flex'
        justifyContent='center'
        alignItems='center'
        // [*] theme colors
        color={theme.chunks.item.stringsPattern.stringNames}
        backgroundColor='blackAlpha.700'
      >
        {props.name}
      </Heading>

      <Flex direction='row' alignItems='center' gap='0.4em' ml='0.2em'>
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

export const StringsChunk = (props: TStringsPatternProps) => {
  const { song: theme } = useAppTheme();

  const stringsToFrets = {
    E: ['|'] as TFretNumber[],
    A: ['|'] as TFretNumber[],
    D: ['|'] as TFretNumber[],
    G: ['|'] as TFretNumber[],
    B: ['|'] as TFretNumber[],
    e: ['|'] as TFretNumber[],
  };

  props.items.split(' ').map(item => {
    if (item === '-' || item === '|') {
      Object.values(stringsToFrets).forEach(entry => entry.push(item));
      return;
    }

    let newSize: number | undefined = undefined;
    item.split('+').map(chord => {
      const arr = stringsToFrets[chord.charAt(0) as keyof typeof stringsToFrets];
      arr.push(chord.slice(1));
      newSize = arr.length;
    });

    if (newSize !== undefined) {
      Object.values(stringsToFrets).forEach(entry => {
        if (entry.length < (newSize as number)) {
          entry.push('-');
        }
      });
    }
  });

  Object.values(stringsToFrets).forEach(arr => arr.push('|'));

  return (
    <Flex direction='column' width='100%' overflowX='auto' fontSize={['0.8em', '0.9em', '1em']}>
      <Box minWidth='max-content'>
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
