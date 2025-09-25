/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Fret.tsx
 * @author Alexandru Delegeanu
 * @version 0.10
 * @description Render chrod based on given config.
 */

import { useAppTheme } from '@/context/AppState';
import type { TGuitarString } from '@/types/common.types';
import { Circle, Divider, Flex, Icon, Spacer } from '@chakra-ui/react';
import { Fragment } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

type TFretProps = {
  stringsToFingers: Map<TGuitarString, number>;
};

const GuitarStrings: TGuitarString[] = ['E', 'A', 'D', 'G', 'B', 'e'] as const;
const THUMB_STRING_ID = 7;
const MUTED_STRING_ID = -1;
const DISTANCE_BETWEEN_CHORDS = 20;

export const Fret = (props: TFretProps) => {
  const { fret: theme } = useAppTheme();

  return (
    <Flex
      direction='row'
      height='5em'
      position='relative'
      // [*] theme colors
      backgroundColor={theme.background}
    >
      {GuitarStrings.map((string, stringIdx) => {
        const finger = props.stringsToFingers.get(string);

        const hasFinger = finger !== undefined && finger !== MUTED_STRING_ID;
        const muted = finger === MUTED_STRING_ID;

        const leftPercent = stringIdx * DISTANCE_BETWEEN_CHORDS;

        return (
          <Fragment key={string}>
            {muted && (
              <Circle
                size='1.5em'
                fontWeight='bold'
                borderWidth='thin'
                position='absolute'
                top='-10%'
                left={`${leftPercent}%`}
                transform='translateX(-50%)'
                padding='0.75em'
                zIndex='1'
                // [*] theme colors
                backgroundColor={theme.muted.background}
                borderColor={theme.muted.border}
                color={theme.muted.color}
              >
                <Icon as={IoCloseSharp} />
              </Circle>
            )}

            <Divider
              orientation='vertical'
              borderWidth='thin'
              // [*] theme colors
              borderColor={theme.dividers}
            />

            {stringIdx < GuitarStrings.length - 1 && <Spacer />}

            {hasFinger && (
              <Circle
                size='1.5em'
                fontWeight='bold'
                borderWidth='thin'
                position='absolute'
                top='50%'
                left={`${leftPercent}%`}
                transform='translate(-50%, -50%)'
                padding='0.75em'
                zIndex='1'
                // [*] theme colors
                backgroundColor={theme.finger.background}
                borderColor={theme.finger.border}
                color={theme.finger.color}
              >
                {finger === THUMB_STRING_ID ? 'T' : finger}
              </Circle>
            )}
          </Fragment>
        );
      })}
    </Flex>
  );
};
