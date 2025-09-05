/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongResource.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Display song resource data.
 */

import type { TResource } from '@/types/song.types';
import { Flex, Icon, Link, ListItem, Text } from '@chakra-ui/react';
import { IoMdMusicalNote } from 'react-icons/io';

type TSongResourceProps = TResource;

export const SongResource = (props: TSongResourceProps) => {
  console.log(props.link);
  return (
    <ListItem>
      <Flex direction='column' alignItems='center' textAlign='center'>
        <Icon as={IoMdMusicalNote} />

        <Link isExternal href={props.link} size={['xs', 'sm']} textColor='CaptionText'>
          {props.alias}
        </Link>

        <Text fontStyle='italic' textAlign='center' fontSize={['small', 'sm']}>
          by {props.author}
        </Text>
      </Flex>
    </ListItem>
  );
};
