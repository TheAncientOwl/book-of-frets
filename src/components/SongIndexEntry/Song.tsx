/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongsIndex.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description List all available songs.
 */

import { Link } from 'react-router-dom';

import { Box, Flex, Heading, Tag } from '@chakra-ui/react';

import chordsIndexRaw from '@/configs/chords-index.json';
import type { TChordsIndex } from '@/configs/types/chord.types';
import type { TSongsIndexEntry } from '@/configs/types/song.types';

type SongProps = TSongsIndexEntry & {
  index: number;
};

const chordsIndex = chordsIndexRaw.index as unknown as TChordsIndex;

export const Song = (props: SongProps) => {
  return (
    <Flex
      direction='column'
      gap='5px'
      border='thin'
      borderColor='blue.500'
      borderStyle='solid'
      borderRadius='0.5em'
      bgColor='blue.300'
      padding='1em 2em'
    >
      <Heading size='sm'>
        {props.index}.
        <Box as='span' ml='3px' textDecor='underline'>
          <Link to={`/${props.file.replace('.json', '')}`}>{props.title}</Link>
        </Box>
      </Heading>

      <Flex gap='5px' fontStyle='italic'>
        »
        {props.artists.map((artist, index) => (
          <Box key={index} as='span'>
            {artist} {index < props.artists.length - 1 && ', '}
          </Box>
        ))}
      </Flex>

      <Flex gap='0.5em'>
        {props.type.map((type, index) => (
          <Tag
            key={index}
            bgColor='blue.200'
            borderColor='blue.500'
            borderStyle='solid'
            borderWidth='thin'
          >
            {type}
          </Tag>
        ))}

        {props.chordIDs.map(chordId => {
          const chordConfig = chordsIndex[chordId];

          console.assert(chordConfig !== undefined, `Could not find chord config for ${chordId}`);

          return (
            <Tag
              bgColor='blue.200'
              borderColor='blue.500'
              borderStyle='solid'
              borderWidth='thin'
              key={chordId}
            >
              {chordsIndex[chordId].name}
            </Tag>
          );
        })}
      </Flex>

      <Flex gap='0.5em'></Flex>
    </Flex>
  );
};
