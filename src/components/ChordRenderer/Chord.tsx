/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 0.11
 * @description Render chrod based on given config.
 */

import { Fragment } from 'react';

import { Box, Divider, Heading } from '@chakra-ui/react';

import { Fret } from '@/components/ChordRenderer/Fret';
import { useAppTheme } from '@/context/AppState';
import type { TFret } from '@/types/chord.types';

type TChordProps = {
  name: string;
  frets: TFret[];
};

export const Chord = (props: TChordProps) => {
  const { chord: theme } = useAppTheme();

  return (
    <Box
      width='12em'
      padding='1em 0.5em'
      borderRadius='1em'
      fontSize='15px'
      // [*] theme colors
      background={theme.background}
    >
      <Heading
        size='xl'
        textAlign='center'
        mb='0.25em'
        // [*] theme colors
        color={theme.title}
      >
        {props.name}
      </Heading>
      <Box width='11em'>
        <Divider
          borderWidth='thin'
          // [*] theme colors
          borderColor={theme.dividers}
        />
        {props.frets.map((fret, idx) => {
          const map = new Map<number, number>(
            fret.map(fretConfig => [fretConfig.string, fretConfig.finger])
          );

          return (
            <Fragment key={idx}>
              <Fret stringsToFingers={map} />
              {idx < props.frets.length && (
                <Divider
                  borderWidth='thin'
                  // [*] theme colors
                  borderColor={theme.dividers}
                />
              )}
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
