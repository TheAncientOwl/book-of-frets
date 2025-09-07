/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Fret.tsx
 * @author Alexandru Delegeanu
 * @version 0.7
 * @description Render chrod based on given config.
 */

import { Fragment } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { Circle, Divider, Flex, Icon, Spacer } from '@chakra-ui/react';

export type TFretTheme = {
  background: string;
  dividers: string;
  muted: {
    background: string;
    border: string;
    color: string;
  };
  finger: {
    background: string;
    border: string;
    color: string;
  };
};

const DefaultFretTheme: TFretTheme = {
  background: 'blackAlpha.300',
  dividers: 'white',
  muted: {
    background: 'red.500',
    border: 'red.600',
    color: 'white',
  },
  finger: {
    background: 'green.500',
    border: 'green.600',
    color: 'white',
  },
};

type TFretProps = {
  stringsToFingers: Map<number, number>;
};

export const Fret = (props: TFretProps) => {
  return (
    <Flex
      direction='row'
      height='5em'
      position='relative'
      // [*] theme colors
      backgroundColor={DefaultFretTheme.background}
    >
      {[1, 2, 3, 4, 5, 6].map(stringIdx => {
        const hasFinger = props.stringsToFingers.has(stringIdx);
        const finger = props.stringsToFingers.get(stringIdx);

        const muted = props.stringsToFingers.has(-stringIdx);

        const leftPercent = (stringIdx - 1) * 20;

        return (
          <Fragment key={stringIdx}>
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
                backgroundColor={DefaultFretTheme.muted.background}
                borderColor={DefaultFretTheme.muted.border}
                color={DefaultFretTheme.muted.color}
              >
                <Icon as={IoCloseSharp} />
              </Circle>
            )}
            <Divider
              orientation='vertical'
              borderWidth='thin'
              // [*] theme colors
              borderColor={DefaultFretTheme.dividers}
            />
            {stringIdx < 6 && <Spacer />}
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
                backgroundColor={DefaultFretTheme.finger.background}
                borderColor={DefaultFretTheme.finger.border}
                color={DefaultFretTheme.finger.color}
              >
                {finger === 7 ? 'T' : finger}
              </Circle>
            )}
          </Fragment>
        );
      })}
    </Flex>
  );
};
