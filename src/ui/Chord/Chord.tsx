/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Chord.tsx
 * @author Alexandru Delegeanu
 * @version 1.5
 * @description Render chrod based on given config.
 */

import type { TChord, TFret } from '@/common/types/chord.types';
import type { TGuitarString } from '@/common/types/common.types';
import { Fret, GuitarStrings, type TIsOpenFret } from '@/ui/Chord/Fret';
import { useShallowAppStore } from '@/store/index';
import { Box, Circle, Divider, Flex, Heading, type BoxProps } from '@chakra-ui/react';
import { Fragment } from 'react';
import { ChordV2Display } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2';

type TChordProps = TChord & {
  containerProps?: BoxProps;
};

const computeOpenFrets = (frets: TFret[]): TIsOpenFret => {
  const out = [true, true, true, true, true, true] as TIsOpenFret;

  GuitarStrings.forEach((stringName, stringIdx) => {
    for (const fret of frets) {
      if (fret[stringName] !== undefined) {
        out[stringIdx] = false;
        break;
      }
    }
  });

  return out;
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
        <ChordV2Display name={props.name} />

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

      <Box width='11em' mt='1.5em'>
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
              <Fret
                stringsToFingers={map}
                isOpenFret={idx !== 0 ? undefined : computeOpenFrets(props.frets)}
              />
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
