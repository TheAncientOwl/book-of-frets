/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongCard.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description List all available songs.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Tag,
  Text,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';

import type { TChordsIndex } from '@/types/chord.types';
import type { TSongsIndexEntry } from '@/types/song.types';

type SongProps = TSongsIndexEntry & {
  index: number;
};

export const SongCard = (props: SongProps) => {
  const [chordsIndex, setChordsIndex] = useState<TChordsIndex | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/chords/index.json')
      .then(response => response.json())
      .then(data => {
        setChordsIndex(data.index as TChordsIndex);
      });
  }, []);

  return (
    <SimpleGrid
      gridTemplateColumns={['22px 90px 1000fr 1fr']}
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
        width={['70px']}
        height={['70px']}
        borderRadius='10px'
        overflow='hidden'
        cursor='pointer'
      >
        <Image
          src={`/songs/${props.directory}/cover.png`}
          width='100%'
          height='100%'
          objectFit='cover'
          borderRadius='10px'
          borderStyle='solid'
          borderWidth='3px'
          borderColor='green.600'
        />

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
        <Heading noOfLines={1} as='h1' size={['sm', 'md']} mb={['5px']} textDecor='underline'>
          {props.title}
        </Heading>

        <Heading noOfLines={1} as='h2' size={['xs', 'sm']} fontStyle='italic' color='CaptionText'>
          {props.artists.map((artist, index) => (
            <Box key={index} as='span'>
              {artist} {index < props.artists.length - 1 && ', '}
            </Box>
          ))}
        </Heading>
      </Box>

      <Flex direction='column' justifyContent='center' alignItems='center'>
        <Popover>
          <PopoverTrigger>
            <IconButton
              zIndex={2}
              aria-label='More about the song'
              icon={<Icon as={MdMoreHoriz} boxSize={5} />} // 👈 properly centers + resizes
              size='lg'
              variant='unstyled'
              onClick={e => e.stopPropagation()}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Flex gap='5px' wrap='wrap'>
                {props.type.map((type, index) => (
                  <Tag
                    key={index}
                    size={['sm', 'md']}
                    bgColor='green.200'
                    borderColor='green.500'
                    borderStyle='solid'
                    borderWidth='thin'
                  >
                    {type}
                  </Tag>
                ))}

                {chordsIndex &&
                  props.chordIDs.map(chordId => {
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
