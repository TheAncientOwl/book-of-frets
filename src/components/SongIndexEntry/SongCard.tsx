/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongCard.tsx
 * @author Alexandru Delegeanu
 * @version 0.13
 * @description List all available songs.
 */

import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Heading,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Tag,
  Text,
  Tooltip,
  Skeleton,
} from '@chakra-ui/react';
import { GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';

import { useAppStateContext } from '@/context/AppState';
import type { TSongsIndexEntry } from '@/types/song.types';
import { TbGuitarPickFilled } from 'react-icons/tb';

type SongProps = TSongsIndexEntry & {
  index: number;
};

const typeToIcon = {
  acoustic: <GiGuitarHead />,
  electric: <GiGuitarBassHead />,
};

export type TSongCardTheme = {
  background: string;
  border: string;
  hover: {
    background: string;
  };
  cover: {
    border: string;
    hover: {
      background: string;
      play: {
        background: string;
        text: string;
      };
    };
  };
  text: {
    number: string;
    title: string;
    authors: string;
    typeTags: string;
  };
  chords: {
    pick: string;
    popover: {
      background: string;
      border: string;
      arrow: string;
      tag: {
        background: string;
        border: string;
        text: string;
      };
    };
  };
};

const DefaultSongCardTheme: TSongCardTheme = {
  background: 'blackAlpha.400',
  border: 'green.600',
  hover: {
    background: 'blackAlpha.500',
  },
  cover: {
    border: 'green.500',
    hover: {
      background: 'rgba(0,0,0,0.6)',
      play: {
        background: 'green.600',
        text: 'white',
      },
    },
  },
  text: {
    number: 'white',
    title: 'white',
    authors: 'white',
    typeTags: 'white',
  },
  chords: {
    pick: 'white',
    popover: {
      border: 'white',
      background: 'gray.900',
      arrow: 'white',
      tag: {
        background: 'green.600',
        border: 'green.400',
        text: 'white',
      },
    },
  },
};

export const SongCard = (props: SongProps) => {
  const navigate = useNavigate();
  const { chordsIndex } = useAppStateContext();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <SimpleGrid
      gridTemplateColumns={['22px 90px 1000fr 1fr', '22px 100px 1000fr 1fr']}
      columns={{ base: 3 }}
      cursor='pointer'
      borderStyle='solid'
      borderWidth='1px'
      padding={['8px']}
      position='relative'
      onClick={() => navigate(`/${props.directory}`)}
      // [*] theme colors
      backgroundColor={DefaultSongCardTheme.background}
      borderColor={DefaultSongCardTheme.border}
      _hover={{ backgroundColor: DefaultSongCardTheme.hover.background }}
    >
      <Text
        fontWeight='bold'
        fontSize={['md']}
        alignContent='center'
        textAlign='right'
        // [*] theme colors
        color={DefaultSongCardTheme.text.number}
      >
        {props.index}
      </Text>

      <Box
        justifySelf='center'
        position='relative'
        width={['70px', '80px']}
        height={['70px', '80px']}
        borderRadius='10px'
        overflow='hidden'
        cursor='pointer'
      >
        <Skeleton isLoaded={isImageLoaded} width='100%' height='100%' borderRadius='10px'>
          <Image
            src={`${import.meta.env.BASE_URL}songs/${props.directory}/cover.jpeg`}
            alt={`${props.title} cover`}
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='10px'
            borderStyle='solid'
            borderWidth='3px'
            onLoad={() => setIsImageLoaded(true)}
            // [*] theme colors
            borderColor={DefaultSongCardTheme.cover.border}
          />
        </Skeleton>

        {/* Overlay */}
        <Flex
          position='absolute'
          top={0}
          left={0}
          width='100%'
          height='100%'
          backgroundColor='rgba(0,0,0,0.6)'
          justifyContent='center'
          alignItems='center'
          opacity={0}
          transition='opacity 0.2s'
          _hover={{ opacity: 1 }}
        >
          {/* Play Button */}
          <Box
            width={['30px']}
            height={['30px']}
            borderRadius='50%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            // [*] theme colors
            backgroundColor={DefaultSongCardTheme.cover.hover.play.background}
          >
            <Box
              as='span'
              ml='2px'
              width={0}
              height={0}
              borderTop='6px solid transparent'
              borderBottom='6px solid transparent'
              // [*] theme colors
              borderLeft={`10px solid ${DefaultSongCardTheme.cover.hover.play.text}`}
            />
          </Box>
        </Flex>
      </Box>

      <Box pt='5px'>
        <Heading
          noOfLines={1}
          as='h1'
          size={['sm', 'md']}
          mb={['5px']}
          // [*] theme colors
          color={DefaultSongCardTheme.text.title}
        >
          {props.title}
        </Heading>

        <Heading
          noOfLines={1}
          as='h2'
          size={['xs', 'sm']}
          mb={['5px']}
          fontStyle='italic'
          // [*] theme colors
          color={DefaultSongCardTheme.text.authors}
        >
          {props.artists.map((artist, index) => (
            <Box key={index} as='span'>
              {artist} {index < props.artists.length - 1 && ', '}
            </Box>
          ))}
        </Heading>

        <Flex
          // [*] theme colors
          color={DefaultSongCardTheme.text.typeTags}
        >
          {props.type.map((item, index) => (
            <Fragment key={index}>
              <Tooltip label={item}>{typeToIcon[item as keyof typeof typeToIcon]}</Tooltip>
            </Fragment>
          ))}
        </Flex>
      </Box>

      <Flex direction='column' justifyContent='center' alignItems='center'>
        <Popover>
          <PopoverTrigger>
            <Box
              mr={['10px']}
              zIndex={2}
              aria-label='More about the song'
              onClick={e => e.stopPropagation()}
              fontSize='20px'
              padding='5px'
              // [*] theme colors
              color={DefaultSongCardTheme.chords.pick}
            >
              <TbGuitarPickFilled />
            </Box>
          </PopoverTrigger>
          <PopoverContent
            // [*] theme colors
            backgroundColor={DefaultSongCardTheme.chords.popover.background}
            borderColor={DefaultSongCardTheme.chords.popover.border}
          >
            <PopoverArrow
              // [*] theme colors
              backgroundColor={DefaultSongCardTheme.chords.popover.arrow}
            />
            <PopoverBody>
              <Flex gap='5px' wrap='wrap'>
                {props.chordIDs.map(chordId => {
                  const chordConfig = chordsIndex[chordId];

                  console.assert(
                    chordConfig !== undefined,
                    `Could not find chord config for ${chordId}`
                  );

                  return (
                    <Tag
                      size={['sm', 'md']}
                      borderStyle='solid'
                      borderWidth='thin'
                      key={chordId}
                      justifyContent='center'
                      // [*] theme colors
                      backgroundColor={DefaultSongCardTheme.chords.popover.tag.background}
                      borderColor={DefaultSongCardTheme.chords.popover.tag.border}
                      color={DefaultSongCardTheme.chords.popover.tag.text}
                    >
                      {chordsIndex[chordId].name}
                    </Tag>
                  );
                })}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </SimpleGrid>
  );
};
