/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file ControlButton.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Turn the tuner ON / OFF.
 */

import { useAppTheme } from '@/state/hooks/useAppTheme';
import { IconButton } from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';

type TControlButton = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
};

export const ControlButton = (props: TControlButton) => {
  const {
    appMenu: {
      items: { tuner: theme },
    },
  } = useAppTheme();

  return (
    <IconButton
      aria-label='play-pause tuner'
      icon={props.isRunning ? <FaStop /> : <FaPlay />}
      onClick={props.isRunning ? props.onStop : props.onStart}
      mb='10px'
      size='lg'
      // [*] theme colors
      backgroundColor={theme.controlButton.background}
      color={theme.controlButton.color}
      _hover={{
        backgroundColor: theme.controlButton.hover.background,
        color: theme.controlButton.hover.color,
      }}
    />
  );
};
