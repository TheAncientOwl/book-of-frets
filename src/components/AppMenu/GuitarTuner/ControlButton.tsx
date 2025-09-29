/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file ControlButton.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Turn the tuner ON / OFF.
 */

import { IconButton } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';

type TControlButton = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
};

export const ControlButton = (props: TControlButton) => {
  return (
    <IconButton
      aria-label='play-pause tuner'
      icon={props.isRunning ? <FaStop /> : <FaPlay />}
      onClick={props.isRunning ? props.onStop : props.onStart}
      mb='10px'
      size='lg'
      // [*] theme colors
      backgroundColor='purple.400'
      color='whiteAlpha.900'
      _hover={{
        backgroundColor: 'purple.500',
        color: 'white',
      }}
    />
  );
};
