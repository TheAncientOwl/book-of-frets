/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongCard.tsx
 * @author Alexandru Delegeanu
 * @version 0.16
 * @description List all available songs.
 */

import type { TSongsIndexEntry } from '@/common/types/song.types';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
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
  Skeleton,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';
import { TbGuitarPickFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

type SongProps = TSongsIndexEntry & {
  index: number;
};

const typeToIcon = {
  acoustic: <GiGuitarHead />,
  electric: <GiGuitarBassHead />,
};

export const SongCard = (props: SongProps) => {
  const { songCard: theme } = useAppTheme();

  const navigate = useNavigate();
  const { chordsIndex } = useAppState();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <SimpleGrid
      gridTemplateColumns={['26px 90px 1000fr 1fr', '26px 100px 1000fr 1fr']}
      columns={{ base: 3 }}
      cursor='pointer'
      borderStyle='solid'
      borderWidth='1px'
      padding={['8px']}
      position='relative'
      onClick={() => navigate(`/${props.directory}`)}
      // [*] theme colors
      backgroundColor={theme.background}
      borderColor={theme.border}
      _hover={{ backgroundColor: theme.hover.background }}
    >
      <Text
        fontWeight='bold'
        fontSize={['md']}
        alignContent='center'
        textAlign='center'
        // [*] theme colors
        color={theme.text.number}
      >
        {props.index}.
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
            src={`${import.meta.env.BASE_URL}songs/${props.directory}/cover.webp`}
            alt={`${props.title} cover`}
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='10px'
            borderStyle='solid'
            borderWidth='3px'
            onLoad={() => setIsImageLoaded(true)}
            // [*] theme colors
            borderColor={theme.cover.border}
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
            backgroundColor={theme.cover.hover.play.background}
          >
            <Box
              as='span'
              ml='2px'
              width={0}
              height={0}
              borderTop='6px solid transparent'
              borderBottom='6px solid transparent'
              // [*] theme colors
              borderLeft={`10px solid ${theme.cover.hover.play.text}`}
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
          color={theme.text.title}
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
          color={theme.text.authors}
        >
          {props.artists.map((artist, index) => (
            <Box key={index} as='span'>
              {artist} {index < props.artists.length - 1 && ', '}
            </Box>
          ))}
        </Heading>

        <Flex
          // [*] theme colors
          color={theme.text.typeTags}
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
              color={theme.chords.pick}
            >
              <TbGuitarPickFilled />
            </Box>
          </PopoverTrigger>
          <PopoverContent
            // [*] theme colors
            backgroundColor={theme.chords.popover.background}
            borderColor={theme.chords.popover.border}
          >
            <PopoverArrow
              // [*] theme colors
              backgroundColor={theme.chords.popover.arrow}
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
                      backgroundColor={theme.chords.popover.tag.background}
                      borderColor={theme.chords.popover.tag.border}
                      color={theme.chords.popover.tag.text}
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
