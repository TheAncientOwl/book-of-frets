/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Fret.tsx
 * @author Alexandru Delegeanu
 * @version 1.3
 * @description Render chrod based on given config.
 */

import type { TGuitarString } from '@/common/types/common.types';
import { useShallowAppStore } from '@/store/index';
import { Box, Circle, Divider, Flex, Icon, Spacer } from '@chakra-ui/react';
import { Fragment } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

export const GuitarStrings: TGuitarString[] = ['E', 'A', 'D', 'G', 'B', 'e'] as const;
const GuitarStringsWidths: string[] = ['3.5px', '3px', '2.5px', '2px', '1.5px', '1px'] as const;
const THUMB_STRING_ID = 7;
const MUTED_STRING_ID = -1;
const DISTANCE_BETWEEN_CHORDS = 20;

export type TIsOpenFret = [boolean, boolean, boolean, boolean, boolean, boolean];

export type TBarreChordLine = {
  begin: number;
  span: number;
  finger: number;
};

type TStringsToFingersMap = Map<TGuitarString, number>;

const getBarreChordLine = (stringsToFingers: TStringsToFingersMap): TBarreChordLine | undefined => {
  const barre: TBarreChordLine = { begin: -1, span: -1, finger: -1 };

  let lastIdx = -1;
  GuitarStrings.forEach((stringName, stringIdx) => {
    const fingerId = stringsToFingers.get(stringName);

    if (fingerId !== undefined && fingerId !== MUTED_STRING_ID) {
      if (barre.begin === -1) {
        barre.begin = stringIdx;
        barre.finger = fingerId;
        barre.span = 1;
        lastIdx = stringIdx;
      } else if (barre.finger === fingerId && lastIdx == stringIdx - 1) {
        barre.span += 1;
        lastIdx = stringIdx;
      } else {
        return undefined;
      }
    }
  });

  return barre.span > 1 ? barre : undefined;
};

type TFretProps = {
  stringsToFingers: TStringsToFingersMap;
  isOpenFret?: TIsOpenFret;
};

export const Fret = (props: TFretProps) => {
  const { theme, showFinger } = useShallowAppStore(state => ({
    theme: state.appTheme.fret,
    showFinger: state.songSettings.display.chordsFingers,
  }));

  const circleColor = showFinger ? theme.finger.background : theme.finger.border;

  const barre = getBarreChordLine(props.stringsToFingers);

  return (
    <Flex
      direction='row'
      height='5em'
      position='relative'
      // [*] theme colors
      backgroundColor={theme.background}
    >
      {barre && (
        <Box
          position='absolute'
          top='50%'
          left={`${barre.begin * DISTANCE_BETWEEN_CHORDS - 7}%`}
          width={`${barre.span * DISTANCE_BETWEEN_CHORDS * 0.95}%`}
          fontWeight='bold'
          height='1.5em'
          transform='translateY(-50%)'
          zIndex='10'
          border={`1px solid ${theme.finger.border}`}
          borderRadius='999px'
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          // [*] theme colors
          backgroundColor={circleColor}
          borderColor={theme.finger.border}
          color={theme.finger.color}
        >
          {barre.finger}
        </Box>
      )}

      {GuitarStrings.map((string, stringIdx) => {
        const finger = props.stringsToFingers.get(string);

        const hasFinger = finger !== undefined && finger !== MUTED_STRING_ID;
        const muted = finger === MUTED_STRING_ID;
        const isOpen = props.isOpenFret && props.isOpenFret[stringIdx];

        const leftPercent = stringIdx * DISTANCE_BETWEEN_CHORDS;

        return (
          <Fragment key={string}>
            {muted && (
              <Circle
                size='1.5em'
                fontWeight='bold'
                borderWidth='thin'
                position='absolute'
                top='-45%'
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

            {isOpen && (
              <Circle
                size='1.5em'
                fontWeight='bold'
                borderWidth='thin'
                position='absolute'
                top='-45%'
                left={`${leftPercent}%`}
                transform='translateX(-50%)'
                padding='0.75em'
                zIndex='1'
                // [*] theme colors
                // backgroundColor={circleColor}
                borderColor={theme.finger.border}
                color={theme.finger.color}
              ></Circle>
            )}

            <Divider
              orientation='vertical'
              borderLeft={`${GuitarStringsWidths[stringIdx]} solid`}
              // [*] theme colors
              borderColor={theme.dividers}
            />

            {stringIdx < GuitarStrings.length - 1 && <Spacer />}

            {!barre && hasFinger && (
              <Circle
                size='1.5em'
                fontWeight='bold'
                borderWidth='thin'
                position='absolute'
                top='50%'
                left={`${leftPercent}%`}
                transform='translate(-50%, -50%)'
                padding='0.75em'
                zIndex='100'
                // [*] theme colors
                backgroundColor={circleColor}
                borderColor={theme.finger.border}
                color={theme.finger.color}
              >
                {showFinger && <>{finger === THUMB_STRING_ID ? 'T' : finger}</>}
              </Circle>
            )}
          </Fragment>
        );
      })}
    </Flex>
  );
};
