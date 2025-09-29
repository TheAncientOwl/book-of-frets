/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Strings.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Strings display for the guitar tuner.
 */

import { Button, Divider, Flex, Heading } from '@chakra-ui/react';

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
      gap='5px'
    >
      <Heading
        size='md'
        position='sticky'
        left='0'
        zIndex={5}
        borderRadius='5px'
        textAlign='center'
      >
        <Button
          rounded='full'
          size='sm'
          width='100%'
          colorScheme={props.active ? 'green' : 'gray'}
          onClick={props.onClick}
        >
          {props.name}
        </Button>
      </Heading>

      <Divider orientation='vertical' height='125px' borderWidth='2px' />
    </Flex>
  );
};

type TStringsProps = {
  activeString: TStringName | null;
  onStringClick: (clickedString: TStringName) => void;
};

const StringsOrder: TStringName[] = ['E', 'A', 'D', 'G', 'B', 'e'] as const;

export const Strings = (props: TStringsProps) => {
  return (
    <Flex direction='row' gap='10px' justifyContent='center'>
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
