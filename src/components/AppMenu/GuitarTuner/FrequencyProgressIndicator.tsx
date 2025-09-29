/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FrequencyProgressIndicator.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Display progress until target frequency.
 */

import { useAppTheme } from '@/state/hooks/useAppTheme';
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
  const {
    appMenu: {
      items: { tuner: theme },
    },
  } = useAppTheme();

  const diff = props.targetFreq - props.currentFreq;
  const diffAbs = Math.abs(diff);

  const matched = diffAbs <= props.threshold;
  const tuneUp = diff > 0;

  const colors = matched
    ? theme.frequencyProgressIndicator.matched
    : tuneUp
    ? theme.frequencyProgressIndicator.tuneUp
    : theme.frequencyProgressIndicator.tuneDown;

  return (
    <Flex {...props.containerProps} justifyContent='center'>
      <Circle
        size='12'
        borderWidth='thin'
        fontWeight='bold'
        // [*] theme colors
        color={colors.color}
        backgroundColor={colors.background}
        borderColor={colors.border}
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
