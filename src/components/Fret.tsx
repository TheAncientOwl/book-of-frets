/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Fret.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render chrod based on given config.
 */

import { Circle, Divider, Flex, Icon, Spacer } from '@chakra-ui/react';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface IFretProps {
  stringsToFingers: Map<number, number>;
}

export const Fret = (props: IFretProps) => {
  return (
    <Flex direction='row' backgroundColor='blue.800' height='5em' position='relative'>
      {[1, 2, 3, 4, 5, 6].map(stringIdx => {
        const hasFinger = props.stringsToFingers.has(stringIdx);
        const finger = props.stringsToFingers.get(stringIdx);

        const muted = props.stringsToFingers.has(-stringIdx);

        const leftPercent = (stringIdx - 1) * 20;

        return (
          <React.Fragment key={stringIdx}>
            {muted && (
              <Circle
                size='1.5em'
                bg='red.600'
                color='red.900'
                fontWeight='bold'
                borderColor='blue.900'
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
            <Divider orientation='vertical' borderColor='gray.100' borderWidth='thin' />
            {stringIdx < 6 && <Spacer />}
            {hasFinger && (
              <Circle
                size='1.5em'
                bg='blue.600'
                color='blue.900'
                fontWeight='bold'
                borderColor='blue.900'
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
          </React.Fragment>
        );
      })}
    </Flex>
  );
};
