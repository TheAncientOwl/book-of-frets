/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file StringsPattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.10
 * @description Render song strings pattern.
 */

import { Box, Circle, Divider, Flex, Heading } from '@chakra-ui/react';

import type { TStringsPattern } from '@/types/song.types';

type TStringsPatternProps = TStringsPattern & {
  showChordTimes: boolean;
};

type TFretNumber = number | '-' | '|';

type TStringProps = {
  name: string;
  frets: TFretNumber[];
};

const String = (props: TStringProps) => {
  return (
    <Flex direction='row' alignItems='center' gap='1em' position='relative'>
      <Heading size='md'>{props.name}</Heading>
      <Flex direction='row' position='absolute' left='30px' alignItems='center' gap='5px'>
        {props.frets.map((fret, index) => {
          if (fret === '-') {
            return (
              <Box width='1.4em'>
                <Divider borderWidth='thin' />
              </Box>
            );
          } else if (fret === '|') {
            return <Box>|</Box>;
          } else {
            return (
              <Box width='1.4em'>
                <Circle
                  key={index}
                  size='1.4em'
                  // bg='green.300'
                  // color='green.900'
                  fontWeight='bold'
                  // borderColor='green.900'
                  borderWidth='thin'
                >
                  {fret}
                </Circle>
              </Box>
            );
          }
        })}
      </Flex>
    </Flex>
  );
};

export const StringsPattern = (props: TStringsPatternProps) => {
  const stringsToFrets = [['-'], ['-'], ['-'], ['-'], ['-'], ['-'], ['-']] as TFretNumber[][];

  props.segments.forEach(segment => {
    segment.forEach(stringFret => {
      const { string, fret } = stringFret;
      stringsToFrets[string].push(fret);
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
      <String name='E' frets={stringsToFrets[6]} />
      <String name='B' frets={stringsToFrets[5]} />
      <String name='G' frets={stringsToFrets[4]} />
      <String name='D' frets={stringsToFrets[3]} />
      <String name='A' frets={stringsToFrets[2]} />
      <String name='E' frets={stringsToFrets[1]} />
      <Divider
      // borderColor='green.900'
      />
    </Flex>
  );
};
