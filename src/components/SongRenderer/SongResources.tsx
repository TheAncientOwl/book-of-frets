/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongResources.tsx
 * @author Alexandru Delegeanu
 * @version 0.8
 * @description Render song resources data.
 */

import type { TSong } from '@/common/types/song.types';
import { SongResource } from '@/components/SongRenderer/SongResource';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Divider, Flex, Heading, Icon, List, ListItem, Text } from '@chakra-ui/react';
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
            <ListItem>
              {index < props.resources.length - 1 && (
                <Divider
                  mt='1em'
                  mb='1em'
                  // [*] theme colors
                  borderColor={theme.resources.item.alias}
                />
              )}
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
