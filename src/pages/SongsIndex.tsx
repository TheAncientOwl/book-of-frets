/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongsIndex.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description List all available songs.
 */

import { useEffect, useState } from 'react';

import { Container, Flex } from '@chakra-ui/react';

import type { TSongsIndexEntry } from '@/types/song.types';

import { Song } from '@/components/SongIndexEntry/Song';

export const SongsIndex = () => {
  const [songsIndex, setSongsIndex] = useState<TSongsIndexEntry[]>([]);

  useEffect(() => {
    fetch('/songs/index.json')
      .then(response => response.json())
      .then(data => setSongsIndex(data.index as TSongsIndexEntry[]))
      .catch(error => {
        // TODO: redirect to 404 or something
        console.error('Failed to fetch songs index:', error);
      });
  }, []);

  return (
    <Container backgroundColor='blue.200' padding='1em 1.5em' borderRadius='0.5em'>
      <Flex direction='column' gap='1em'>
        {songsIndex.map((song, index) => (
          <Song key={index} index={index + 1} {...song} />
        ))}
      </Flex>
    </Container>
  );
};
