/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongCard.tsx
 * @author Alexandru Delegeanu
 * @version 0.11
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
      borderColor='green.800'
      padding={['8px']}
      backgroundColor='blackAlpha.300'
      _hover={{ bgColor: 'blackAlpha.400' }}
      position='relative'
      onClick={() => navigate(`/${props.directory}`)}
    >
      <Text fontWeight='bold' fontSize={['md']} alignContent='center' textAlign='right'>
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
            borderColor='green.600'
            onLoad={() => setIsImageLoaded(true)}
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
            backgroundColor='green.500'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Box
              as='span'
              ml='2px'
              width={0}
              height={0}
              borderLeft='10px solid white'
              borderTop='6px solid transparent'
              borderBottom='6px solid transparent'
            />
          </Box>
        </Flex>
      </Box>

      <Box pt='5px'>
        <Heading noOfLines={1} as='h1' size={['sm', 'md']} mb={['5px']} color='CaptionText'>
          {props.title}
        </Heading>

        <Heading noOfLines={1} as='h2' size={['xs', 'sm']} mb={['5px']} fontStyle='italic'>
          {props.artists.map((artist, index) => (
            <Box key={index} as='span'>
              {artist} {index < props.artists.length - 1 && ', '}
            </Box>
          ))}
        </Heading>

        <Flex>
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
            >
              <TbGuitarPickFilled />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
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
                      bgColor='green.200'
                      borderColor='green.500'
                      borderStyle='solid'
                      borderWidth='thin'
                      key={chordId}
                      justifyContent='center'
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
