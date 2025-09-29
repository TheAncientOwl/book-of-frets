/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FrequencyProgressIndicator.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Display progress until target frequency.
 */

import { Box, Icon, type BoxProps } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

type TFrequencyProgressIndicatorProps = {
  boxProps?: BoxProps;
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
    <Box {...props.boxProps} color={matched ? 'green' : tuneUp ? 'cyan' : 'red'}>
      {props.active ? (
        matched ? (
          <Icon as={FaCheck} />
        ) : (
          `${tuneUp ? '+' : '-'}${diffAbs.toFixed(0)}`
        )
      ) : (
        '-'
      )}
    </Box>
  );
};
