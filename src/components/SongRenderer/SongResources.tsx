/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongResources.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description Render song resources data.
 */

import { SongResource } from '@/components/SongRenderer/SongResource';
import { useAppTheme } from '@/context/AppState';
import type { TSong } from '@/types/song.types';
import { Box, Divider, Flex, Heading, Icon, List, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { MdLibraryMusic } from 'react-icons/md';

type TSongResourcesProps = Pick<TSong, 'resources'>;

export const SongResources = (props: TSongResourcesProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Box mt='1em' padding='1em 1.25em'>
      <Heading as='h1' size='md' mb='1em' textAlign='center'>
        <Flex
          justifyContent='center'
          alignItems='center'
          gap='0.25em'
          // [*] theme colors
          color={theme.resources.title}
        >
          <Icon as={MdLibraryMusic} />
          Resources
          <Icon as={MdLibraryMusic} />
        </Flex>
      </Heading>

      {props.resources.length === 0 && <Text textAlign='center'>Nothing here yet</Text>}

      <List>
        {props.resources.map((resource, index) => (
          <Fragment key={index}>
            <SongResource {...resource} />
            {index < props.resources.length - 1 && <Divider mt='1em' mb='1em' />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
