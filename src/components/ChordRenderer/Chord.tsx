/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description Render chrod based on given config.
 */

import { Fragment } from 'react';

import { Box, Divider, Heading } from '@chakra-ui/react';

import type { TFret } from '@/types/chord.types';

import { Fret } from '@/components/ChordRenderer/Fret';

type TChordProps = {
  name: string;
  frets: TFret[];
};

export const Chord = (props: TChordProps) => {
  return (
    <Box width='12em' backgroundColor='blue.600' padding='1em 0.5em' borderRadius='1em'>
      <Heading size='xl' textAlign='center' mb='0.25em'>
        {props.name}
      </Heading>
      <Box width='11em'>
        <Divider borderColor='gray.200' borderWidth='thin' />
        {props.frets.map((fret, idx) => {
          const map = new Map<number, number>(
            fret.map(fretConfig => [fretConfig.string, fretConfig.finger])
          );

          return (
            <Fragment key={idx}>
              <Fret stringsToFingers={map} />
              {idx < props.frets.length && <Divider borderColor='gray.100' borderWidth='thin' />}
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
