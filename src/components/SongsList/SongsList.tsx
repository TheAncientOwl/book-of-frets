/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongsList.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description List song cards.
 */

import type { TSongsIndexEntry } from '@/common/types/song.types';
import { SongsSkeletonList } from '@/components/SongCard/Skeleton';
import { SongCard } from '@/components/SongCard/SongCard';
import { useAppStore } from '@/store/index';
import { createSmartList } from '@/ui/SmartList/SmartList';
import { Box, Container, Flex } from '@chakra-ui/react';

const SongsSmartList = createSmartList<TSongsIndexEntry>();

type TSongsListProps = {
  data: TSongsIndexEntry[];
};

export const SongsList = (props: TSongsListProps) => {
  const theme = useAppStore(state => state.appTheme.songsIndexPage);

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
      <SongsSmartList.Wrapper
        context={SongsSmartList.context}
        setup={{
          data: props.data,
          getKey: song =>
            song.type.map(type => `@${type}`).join('') + song.title + ' ' + song.artists.join(' '),
        }}
      >
        <Flex justifyContent='center' mx='auto' mb='20px' width={['250px', '300px', '400px']}>
          <SongsSmartList.SearchBar
            useContext={SongsSmartList.context.use}
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
          <SongsSmartList.Content
            virtualizedFallback={<SongsSkeletonList items={11} />}
            virtualized
            virtualizedOverscanRowCount={3}
            useContext={SongsSmartList.context.use}
            render={(song, index) => <SongCard key={index} index={index + 1} {...song} />}
          />
        </Box>
      </SongsSmartList.Wrapper>
    </Container>
  );
};
