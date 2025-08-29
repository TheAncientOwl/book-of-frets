/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Render chrod based on given config.
 */

import { Box, Divider, Heading } from '@chakra-ui/react';
import { Fret } from './Fret';
import React from 'react';

interface IFingerToString {
  finger: number;
  string: number;
}

interface IChordProps {
  name: string;
  frets: IFingerToString[][];
}

export const Chord = (props: IChordProps) => {
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
            <React.Fragment key={idx}>
              <Fret stringsToFingers={map} />
              {idx < props.frets.length && <Divider borderColor='gray.100' borderWidth='thin' />}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
