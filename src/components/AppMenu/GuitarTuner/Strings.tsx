/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Strings.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description Strings display for the guitar tuner.
 */

import { useAppStore } from '@/store/index';
import { Circle, Divider, Flex, type FlexProps } from '@chakra-ui/react';

export type TStringName = 'E' | 'A' | 'D' | 'G' | 'B' | 'e';

type TStringProps = {
  name: TStringName;
  active: boolean;
  onClick: () => void;
};

const String = (props: TStringProps) => {
  const theme = useAppStore(state => state.appTheme.appMenu.items.tuner);

  const colors = props.active ? theme.strings.active : theme.strings.inactive;

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      position='relative'
      as='button'
      onClick={props.onClick}
    >
      <Circle
        size='10'
        fontWeight='bold'
        borderWidth='3px'
        // [*] theme colors
        color={colors.noteColor}
        borderColor={colors.noteBorderColor}
        backgroundColor={colors.backgroundColor}
      >
        {props.name}
      </Circle>

      <Divider
        orientation='vertical'
        height='125px'
        borderWidth='2px'
        // [*] theme colors
        borderColor={colors.stringColor}
      />
    </Flex>
  );
};

type TStringsProps = {
  activeString: TStringName | null;
  onStringClick: (clickedString: TStringName) => void;
  containerProps?: FlexProps;
};

const StringsOrder: TStringName[] = ['E', 'A', 'D', 'G', 'B', 'e'] as const;

export const Strings = (props: TStringsProps) => {
  return (
    <Flex {...props.containerProps} direction='row' gap='10px' justifyContent='center'>
      {StringsOrder.map((stringName, index) => (
        <String
          key={index}
          name={stringName}
          active={stringName === props.activeString}
          onClick={() => props.onStringClick(stringName)}
        />
      ))}
    </Flex>
  );
};
