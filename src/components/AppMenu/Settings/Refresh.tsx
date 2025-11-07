/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Refresh.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description .Refresh configs
 */

import { useAppStore } from '@/store/index';
import { Button, VStack, useToast } from '@chakra-ui/react';

export const Refresh = () => {
  const updateChordsIndex = useAppStore(state => state.updateChordsIndex);
  const toast = useToast();

  const handleRefresh = () => {
    updateChordsIndex();
    toast({
      title: 'Chords refreshed.',
      description: 'The chords index was successfully updated.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return (
    <VStack align='start' spacing={3} justifyContent='center' alignItems='center'>
      <Button onClick={handleRefresh} colorScheme='blackAlpha' size='md'>
        Refresh Chords
      </Button>
    </VStack>
  );
};

export default Refresh;
