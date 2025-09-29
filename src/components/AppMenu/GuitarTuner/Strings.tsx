/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Strings.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Strings display for the guitar tuner.
 */

import { Circle, Divider, Flex, type FlexProps } from '@chakra-ui/react';

export type TStringName = 'E' | 'A' | 'D' | 'G' | 'B' | 'e';

type TStringProps = {
  name: TStringName;
  active: boolean;
  onClick: () => void;
};

const String = (props: TStringProps) => {
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
        color={props.active ? 'purple.500' : 'gray.300'}
        borderColor={props.active ? 'purple.500' : 'gray.300'}
        backgroundColor='blackAlpha.300'
      >
        {props.name}
      </Circle>

      <Divider
        orientation='vertical'
        height='125px'
        borderWidth='2px'
        // [*] theme colors
        borderColor={props.active ? 'purple.500' : 'gray.300'}
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
