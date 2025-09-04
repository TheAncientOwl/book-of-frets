/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongsIndex.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description List all available songs.
 */

import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import type { TSongsIndexEntry } from '@/types/song.types';

import { SongCard } from '@/components/SongIndexEntry/SongCard';

export const SongsIndex = () => {
  const [songsIndex, setSongsIndex] = useState<TSongsIndexEntry[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}songs/index.json`)
      .then(response => response.json())
      .then(data => setSongsIndex(data.index as TSongsIndexEntry[]))
      .catch(error => {
        // TODO: redirect to 404 or something
        console.error('Failed to fetch songs index:', error);
      });
  }, []);

  return (
    <Container
      maxW={['100vw', 'xl']}
      backgroundColor='#2B8C44'
      padding={['0em', '1em']}
      borderRadius='0.5em'
    >
      {songsIndex.map((song, index) => (
        <SongCard key={index} index={index + 1} {...song} />
      ))}
    </Container>
  );
};

export default SongsIndex;
