/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FrequencyDisplay.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Display current frequency.
 */

import { Box, type BoxProps } from '@chakra-ui/react';

type TFrequencyDisplayProps = {
  freq: number | null;
  containerProps?: BoxProps;
};

export const FrequencyDisplay = (props: TFrequencyDisplayProps) => {
  return (
    <Box
      {...props.containerProps}
      fontWeight='bold'
      // [*] theme colors
      color='white'
    >
      {props.freq !== null ? `(${props.freq?.toFixed(2)} Hz)` : '(0 Hz)'}
    </Box>
  );
};
