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

import { Song } from '@/components/SongIndexEntry/Song';
import songsIndexRaw from '@/configs/songs-index.json';
import type { TSongsIndexEntry } from '@/configs/types/song.types';
import { Container, Flex } from '@chakra-ui/react';

export const SongsIndex = () => {
  const songsIndex = songsIndexRaw.index as unknown as TSongsIndexEntry[];

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
