/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongsSkeletonList.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Render songs skeleton list.
 */

import { useAppStore } from '@/store/index';
import { Box, Flex, List, SimpleGrid, Skeleton } from '@chakra-ui/react';

type TSongsSkeletonListProps = {
  items: number;
};

const SkeletonSongCard = () => {
  const theme = useAppStore(state => state.appTheme.songCard);

  return (
    <SimpleGrid
      gridTemplateColumns={['27px 90px 1000fr 1fr', '27px 100px 1000fr 1fr']}
      borderStyle='solid'
      borderWidth='1px'
      padding={['8px']}
      position='relative'
      // [*] theme colors
      backgroundColor={theme.background}
      borderColor={theme.border}
      _hover={{ backgroundColor: theme.hover.background }}
    >
      <Skeleton height='18px' width='18px' margin='auto' />

      <Box
        justifySelf='center'
        position='relative'
        width={['70px', '80px']}
        height={['70px', '80px']}
        borderRadius='10px'
        overflow='hidden'
        cursor='pointer'
      >
        <Skeleton borderRadius='10px' width='100%' height='100%' />
      </Box>
      <Box pt='5px'>
        <Skeleton height='20px' width={['70%', '60%']} mb='6px' />
        <Skeleton height='16px' width={['45%', '40%']} mb='8px' />
        <Skeleton height='16px' width='14px' />
      </Box>

      <Flex direction='column' justifyContent='center' alignItems='center' pr='15px'>
        <Skeleton height='18px' width='18px' borderRadius='50%' />
      </Flex>
    </SimpleGrid>
  );
};

export const SongsSkeletonList = (props: TSongsSkeletonListProps) => {
  return (
    <List>
      {Array.from({ length: props.items }).map((_, index) => (
        <SkeletonSongCard key={index} />
      ))}
    </List>
  );
};
