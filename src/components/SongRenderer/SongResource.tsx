/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongResource.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Display song resource data.
 */

import type { TResource } from '@/types/song.types';
import { AspectRatio, Box, Flex, Icon, Link, ListItem, Text } from '@chakra-ui/react';
import { IoMdMusicalNote } from 'react-icons/io';

type TSongResourceProps = TResource;

const getYouTubeVideoId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtube.com' ||
      parsedUrl.hostname === 'm.youtube.com'
    ) {
      if (parsedUrl.pathname.startsWith('/shorts/')) {
        return parsedUrl.pathname.split('/')[2];
      }
      return parsedUrl.searchParams.get('v');
    }
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1);
    }
    return null;
  } catch {
    return null;
  }
};

export const SongResource = (props: TSongResourceProps) => {
  const videoId = getYouTubeVideoId(props.link);

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

        {videoId ? (
          <Box width='100%' maxW='400px' my={2}>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={props.alias}
                allow='accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        ) : null}
      </Flex>
    </ListItem>
  );
};
