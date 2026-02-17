/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Loading.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Loading animation.
 */

import { Flex, Heading, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex
      direction='column'
      color='whiteAlpha.400'
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
      gap='1em'
    >
      <Heading>Thinking...</Heading>
      <Spinner size='lg' colorScheme='whiteAlpha' />
    </Flex>
  );
};
