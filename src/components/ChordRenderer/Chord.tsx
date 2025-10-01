/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 0.16
 * @description Render chrod based on given config.
 */

import type { TFret } from '@/common/types/chord.types';
import type { TGuitarString } from '@/common/types/common.types';
import { Fret } from '@/components/ChordRenderer/Fret';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Divider, Heading, type BoxProps } from '@chakra-ui/react';
import { Fragment } from 'react';

type TChordProps = {
  name: string;
  frets: TFret[];
  containerProps?: BoxProps;
};

export const Chord = (props: TChordProps) => {
  const { chord: theme } = useAppTheme();

  return (
    <Box
      width='13em'
      padding='1em 1em'
      borderRadius='1em'
      fontSize='12px'
      borderWidth='thin'
      display='flex'
      flexDirection='column'
      alignItems='center'
      {...props.containerProps}
      // [*] theme colors
      background={theme.background}
      borderColor={theme.border}
    >
      <Heading
        // size='xl'
        fontSize='2.3em'
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
