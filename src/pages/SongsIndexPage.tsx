/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongsIndexPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.12
 * @description List all available songs.
 */

import { useEffect, useState } from 'react';

import { Container } from '@chakra-ui/react';

import type { TSongsIndexEntry } from '@/types/song.types';

import { createSmartList } from '@/components/SmartList/index';
import { SongCard } from '@/components/SongIndexEntry/SongCard';
import { useAppTheme } from '@/context/AppState';

const SongsList = createSmartList<TSongsIndexEntry>();

export const SongsIndexPage = () => {
  const { songsIndexPage: theme } = useAppTheme();

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
      padding={['0em', '1em']}
      borderRadius='0.5em'
      // [*] theme colors
      background={theme.background}
    >
      <SongsList.Wrapper
        context={SongsList.context}
        setup={{
          data: songsIndex,
          getKey: song => song.title + ' ' + song.artists.join(' '),
        }}
      >
        <SongsList.SearchBar useContext={SongsList.context.use} color='white' mb='20px' />

        <SongsList.Content
          useContext={SongsList.context.use}
          render={(song, index) => <SongCard key={index} index={index + 1} {...song} />}
        />
      </SongsList.Wrapper>
    </Container>
  );
};

export default SongsIndexPage;
