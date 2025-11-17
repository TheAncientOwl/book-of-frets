/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongResource.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Display song resource data.
 */

import type { TResource } from '@/common/types/song.types';
import { useAppStore } from '@/store/index';
import { AspectRatio, Box, Flex, Icon, Link, ListItem, Skeleton, Text } from '@chakra-ui/react';
import { useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useAppStore(state => state.appTheme.song);

  const videoId = getYouTubeVideoId(props.link);

  return (
    <ListItem>
      <Flex direction='column' alignItems='center' textAlign='center'>
        <Icon
          as={IoMdMusicalNote}
          // [*] theme colors
          color={theme.res.item.note}
        />

        <Link
          isExternal
          href={props.link.replaceAll('{book-of-frets}', import.meta.env.BASE_URL)}
          size={['xs', 'sm']}
          // [*] theme colors
          color={theme.res.item.alias}
        >
          {props.alias}
        </Link>

        {props.author !== '-' && (
          <Text
            fontStyle='italic'
            textAlign='center'
            fontSize={['small', 'sm']}
            // [*] theme colors
            color={theme.res.item.author}
          >
            by {props.author}
          </Text>
        )}

        {videoId && (
          <Box width='100%' maxW='400px' my={2} overflow='hidden' borderRadius='10px'>
            <AspectRatio ratio={16 / 9}>
              <Skeleton isLoaded={isLoaded} height='100%' width='100%'>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                  title={props.alias}
                  allow='accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  onLoad={() => setIsLoaded(true)}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </Skeleton>
            </AspectRatio>
          </Box>
        )}
      </Flex>
    </ListItem>
  );
};
