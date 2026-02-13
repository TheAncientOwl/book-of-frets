/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 1.2
 * @description Render chrod based on given config.
 */

import type { TChord } from '@/common/types/chord.types';
import type { TGuitarString } from '@/common/types/common.types';
import { Fret } from '@/ui/Chord/Fret';
import { useShallowAppStore } from '@/store/index';
import { Box, Circle, Divider, Flex, Heading, type BoxProps } from '@chakra-ui/react';
import { Fragment } from 'react';
import { ChordDisplay } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2';

type TChordProps = TChord & {
  containerProps?: BoxProps;
};

export const Chord = (props: TChordProps) => {
  const { theme, fretTheme } = useShallowAppStore(state => ({
    theme: state.appTheme.chord,
    fretTheme: state.appTheme.fret,
  }));

  return (
    <Flex
      width='13em'
      padding='1em 1em'
      borderRadius='1em'
      fontSize='12px'
      borderWidth='thin'
      display='flex'
      flexDirection='column'
      alignItems='center'
      position='relative'
      {...props.containerProps}
      // [*] theme colors
      background={theme.background}
      borderColor={theme.border}
    >
      <Heading
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap='5px'
        fontSize='2.3em'
        textAlign='center'
        mb='0.25em'
        // [*] theme colors
        color={theme.title}
      >
        <ChordDisplay name={props.name} />

        {props.startFret && (
          <Circle
            size='6'
            fontSize='0.45em'
            fontWeight='bold'
            borderWidth='thin'
            // [*] theme colors
            backgroundColor={fretTheme.finger.background}
            borderColor={fretTheme.finger.border}
            color={theme.title}
          >
            {props.startFret}
          </Circle>
        )}
      </Heading>

      <Box width='11em'>
        <Divider
          borderWidth='thin'
          // [*] theme colors
          borderColor={theme.dividers}
        />
        {props.frets.map((fret, idx) => {
          const map = new Map<TGuitarString, number>(
            Object.entries(fret).map(([key, value]) => [key as TGuitarString, value]),
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
    </Flex>
  );
};

export default Chord;
