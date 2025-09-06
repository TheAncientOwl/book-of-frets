/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Fret.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description Render chrod based on given config.
 */

import { Fragment } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

import { Circle, Divider, Flex, Icon, Spacer } from '@chakra-ui/react';

type TFretProps = {
  stringsToFingers: Map<number, number>;
};

export const Fret = (props: TFretProps) => {
  return (
    <Flex direction='row' height='5em' position='relative'>
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
              >
                <Icon as={IoCloseSharp} />
              </Circle>
            )}
            <Divider orientation='vertical' borderWidth='thin' />
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
