/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongHeader.tsx
 * @author Alexandru Delegeanu
 * @version 0.4
 * @description Render song header data.
 */

import { useAppTheme } from '@/context/AppState';
import type { TSong } from '@/types/song.types';
import { Box, Circle, Flex, Heading, Image, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { Fragment, useState } from 'react';

import { GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';

type TSongHeaderProps = Pick<TSong, 'title' | 'artists' | 'capo' | 'type'> & {
  directory: string;
};

const typeToIcon = {
  acoustic: <GiGuitarHead />,
  electric: <GiGuitarBassHead />,
};

export const SongHeader = (props: TSongHeaderProps) => {
  const { song: theme } = useAppTheme();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Flex direction='column' alignItems='center' mb='15px'>
      <Box position='relative' width={['70px', '80px']} height={['70px', '80px']} mb={['5px']}>
        <Skeleton isLoaded={isImageLoaded} width='100%' height='100%' borderRadius='10px'>
          <Image
            src={`${import.meta.env.BASE_URL}songs/${props.directory}/cover.jpeg`}
            alt={`${props.title} cover`}
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='10px'
            borderStyle='solid'
            borderWidth='thin'
            onLoad={() => setIsImageLoaded(true)}
            // [*] theme colors
            borderColor={theme.header.coverBorder}
          />
        </Skeleton>

        <Circle
          position='absolute'
          right='0'
          top='0'
          transform='translate(50%, -50%)'
          size='1em'
          padding='15px'
          fontWeight='bold'
          borderWidth='thin'
          // [*] theme colors
          backgroundColor={theme.capo.background}
          borderColor={theme.capo.border}
          color={theme.capo.text}
        >
          <Flex alignItems='end'>
            <Text fontSize='sm'>C</Text>
            <Text fontSize='xs'>{props.capo}</Text>
          </Flex>
        </Circle>
      </Box>

      <Heading
        noOfLines={1}
        as='h1'
        size={['sm', 'md']}
        mb={['5px']}
        textAlign='center'
        // [*] theme colors
        color={theme.header.title}
      >
        {props.title}
      </Heading>

      <Heading
        noOfLines={1}
        as='h2'
        size={['xs', 'sm']}
        mb={['5px']}
        fontStyle='italic'
        textAlign='center'
        // [*] theme colors
        color={theme.header.artists}
      >
        {props.artists.map((artist, index) => (
          <Box key={index} as='span'>
            {artist} {index < props.artists.length - 1 && ', '}
          </Box>
        ))}
      </Heading>

      <Flex
        justifyContent='center'
        // [*] theme colors
        color={theme.header.typeTags}
      >
        {props.type.map((item, index) => (
          <Fragment key={index}>
            <Tooltip label={item}>{typeToIcon[item as keyof typeof typeToIcon]}</Tooltip>
          </Fragment>
        ))}
      </Flex>
    </Flex>
  );
};
