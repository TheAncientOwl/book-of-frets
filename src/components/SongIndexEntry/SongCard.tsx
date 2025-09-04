/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongCard.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description List all available songs.
 */

import { useEffect, useState } from 'react';

import { Box, Flex, Heading, Image, SimpleGrid, Tag } from '@chakra-ui/react';

import type { TChordsIndex } from '@/types/chord.types';
import type { TSongsIndexEntry } from '@/types/song.types';
import { Link } from 'react-router-dom';

type SongProps = TSongsIndexEntry & {
  index: number;
};

export const SongCard = (props: SongProps) => {
  const [chordsIndex, setChordsIndex] = useState<TChordsIndex | null>(null);

  useEffect(() => {
    fetch('/chords/index.json')
      .then(response => response.json())
      .then(data => {
        setChordsIndex(data.index as TChordsIndex);
      });
  }, []);

  return (
    <Flex
      borderStyle='solid'
      borderWidth='3px'
      borderColor='green.600'
      borderRadius='10px'
      padding={['0.5em', '1em', '1em 1.5em']}
      backgroundColor='blackAlpha.400'
      direction='row'
      align='center'
      alignItems='start'
    >
      <Link to={`/${props.directory}`}>
        <Box
          position='relative'
          width={['70px', '80px', '110px']}
          height={['70px', '80px', '110px']}
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
              width={['24px', '30px', '40px']}
              height={['24px', '30px', '40px']}
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
      </Link>

      <Box ml={['0.4em', '1em']} mr={['3px', '10px']} flex='1'>
        <Heading as='h1' size={['sm', 'md', 'lg']} mb={['3px', '4px', '5px']} textDecor='underline'>
          <Link to={`/${props.directory}`}>{props.title}</Link>
        </Heading>

        <Heading as='h2' size={['xs', 'sm', 'md']} mb={['5px', '10px']} fontStyle='italic'>
          {props.artists.map((artist, index) => (
            <Box key={index} as='span'>
              {artist} {index < props.artists.length - 1 && ', '}
            </Box>
          ))}
        </Heading>

        <Flex gap='2px' wrap='wrap'>
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
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 2, sm: 2, md: 3 }} spacing='2px' style={{ direction: 'rtl' }}>
        {chordsIndex &&
          props.chordIDs.map(chordId => {
            const chordConfig = chordsIndex[chordId];

            console.assert(chordConfig !== undefined, `Could not find chord config for ${chordId}`);

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
      </SimpleGrid>
    </Flex>
  );
};
