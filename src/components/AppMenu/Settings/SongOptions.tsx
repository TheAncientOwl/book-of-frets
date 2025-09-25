/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Song display options.
 */

import { useAppStateContext, useAppTheme } from '@/context/AppState';
import { Checkbox, VStack, type CheckboxProps } from '@chakra-ui/react';

const ThemedCheckbox = (props: CheckboxProps) => {
  const { appMenu } = useAppTheme();
  const theme = appMenu.items.settings.songOption;

  return (
    <Checkbox
      {...props}
      // [*] theme colors
      color={theme.color}
      iconColor={theme.icon.color}
      sx={{
        '& .chakra-checkbox__control': {
          borderColor: theme.icon.border,
          backgroundColor: theme.icon.background,
          _checked: {
            backgroundColor: theme.icon.checked.background,
            borderColor: theme.icon.checked.border,
          },
        },
      }}
    />
  );
};

export const SongOptions = () => {
  const {
    songSettings: { display },
  } = useAppStateContext();

  return (
    <VStack align='start' spacing={3}>
      <ThemedCheckbox
        isChecked={display.times.value}
        onChange={() => display.times.set?.(!display.times.value)}
      >
        Display times
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.chordTimes.value}
        onChange={() => display.chordTimes.set?.(!display.chordTimes.value)}
      >
        Display chord times
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.strummingPattern.value}
        onChange={() => display.strummingPattern.set?.(!display.strummingPattern.value)}
      >
        Display strumming pattern
      </ThemedCheckbox>
    </VStack>
  );
};
