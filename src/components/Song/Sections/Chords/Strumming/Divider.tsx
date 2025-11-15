/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Divider.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Divider.
 */

import { useAppStore } from '@/store/index';
import { Divider, type DividerProps } from '@chakra-ui/react';

export const StrummingChordsDivider = (props: DividerProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <Divider
      orientation='vertical'
      height={['0px', 'auto']}
      width={['70%', '0px']}
      borderWidth='thin'
      mt={['15px', '0px']}
      mb={['15px', '0px']}
      ml={['auto', '0px']}
      mr={['auto', '0px']}
      // [*] theme colors
      borderColor={theme.items.item.chordsPattern.divider}
      {...props}
    />
  );
};
