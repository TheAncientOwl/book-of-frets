/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FrequencyProgressIndicator.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Display progress until target frequency.
 */

import { Circle, Flex, Icon, type FlexProps } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

type TFrequencyProgressIndicatorProps = {
  containerProps?: FlexProps;
  active: boolean;
  currentFreq: number;
  targetFreq: number;
  threshold: number;
};

export const FrequencyProgressIndicator = (props: TFrequencyProgressIndicatorProps) => {
  const diff = props.targetFreq - props.currentFreq;
  const diffAbs = Math.abs(diff);

  const matched = diffAbs <= props.threshold;
  const tuneUp = diff > 0;

  return (
    <Flex
      {...props.containerProps}
      justifyContent='center'
      // [*] theme colors
      color={matched ? 'green.500' : tuneUp ? 'purple.300' : 'red.500'}
    >
      <Circle
        size='12'
        borderWidth='thin'
        fontWeight='bold'
        // [*] theme colors
        backgroundColor='blackAlpha.300'
        borderColor={matched ? 'green.500' : tuneUp ? 'purple.300' : 'red.500'}
      >
        {props.active ? (
          matched ? (
            <Icon as={FaCheck} />
          ) : (
            `${tuneUp ? '+' : '-'}${diffAbs.toFixed(0)}`
          )
        ) : (
          '0'
        )}
      </Circle>
    </Flex>
  );
};
