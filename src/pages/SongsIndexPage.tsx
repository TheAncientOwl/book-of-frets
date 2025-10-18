/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongsIndexPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.21
 * @description List all available songs.
 */

import type { TSongsIndexEntry } from '@/common/types/song.types';
import { createSmartList } from '@/components/SmartList/index';
import { SongCard } from '@/components/SongIndexEntry/SongCard';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { setDocumentThemeColor } from '@/state/theme/utils/setDocumentThemeColor';
import { Box, Container, Flex } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';

const SongsList = createSmartList<TSongsIndexEntry>();

export const SongsIndexPage = () => {
  const { songsIndexPage: theme } = useAppTheme();

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  const [songsIndex, setSongsIndex] = useState<TSongsIndexEntry[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}songs/index.min.json`)
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
      height='100%'
      display='flex'
      flexDirection='column'
      padding={['1em 0em 0.2em 0em', '1em']}
      borderRadius={['0em', '0.5em']}
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
        <Flex justifyContent='center' mx='auto' mb='20px' width={['250px', '300px', '400px']}>
          <SongsList.SearchBar
            useContext={SongsList.context.use}
            // [*] theme colors
            backgroundColor={theme.searchBar.background}
            color={theme.searchBar.color}
            borderColor={theme.searchBar.border}
            _focus={{
              borderColor: theme.searchBar.focusBorder,
            }}
          />
        </Flex>

        <Box
          flex='1'
          overflowY='scroll'
          sx={{
            '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
            msOverflowStyle: 'none', // IE, Edge
            scrollbarWidth: 'none', // Firefox
          }}
        >
          <SongsList.Content
            virtualized
            virtualizedOverscanRowCount={3}
            useContext={SongsList.context.use}
            render={(song, index) => <SongCard key={index} index={index + 1} {...song} />}
          />
        </Box>
      </SongsList.Wrapper>
    </Container>
  );
};

export default SongsIndexPage;
