/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 0.14
 * @description Render chrod based on given config.
 */

import { Fret } from '@/components/ChordRenderer/Fret';
import { useAppTheme } from '@/context/AppState';
import type { TFret } from '@/types/chord.types';
import type { TGuitarString } from '@/types/common.types';
import { Box, Divider, Heading } from '@chakra-ui/react';
import { Fragment } from 'react';

type TChordProps = {
  name: string;
  frets: TFret[];
};

export const Chord = (props: TChordProps) => {
  const { chord: theme } = useAppTheme();

  return (
    <Box
      width='13em'
      padding='1em 1em'
      borderRadius='1em'
      fontSize='15px'
      borderWidth='thin'
      display='flex'
      flexDirection='column'
      alignItems='center'
      // [*] theme colors
      background={theme.background}
      borderColor={theme.border}
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
          const map = new Map<TGuitarString, number>(
            Object.entries(fret).map(([key, value]) => [key as TGuitarString, value])
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
