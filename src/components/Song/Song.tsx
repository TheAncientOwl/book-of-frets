/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 1.6
 * @description Render song based on given config.
 */

import { useSessionStorage } from '@/common/hooks/useSessionStorage';
import type { TSong, TSongSectionLyrics } from '@/common/types/song.types';
import { fetchArchivedJSON } from '@/common/utils/fetchArchivedJSON';
import { SongChordsList } from '@/components/Song/ChordsList';
import { SongHeader } from '@/components/Song/Header';
import { SongSections } from '@/components/Song/Sections/SongSections';
import { useAppStore } from '@/store/index';
import { Loading } from '@/ui/Loading';
import { Box, Container } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

const SongNotes = lazy(() => import('@/components/Song/Notes'));
const SongResources = lazy(() => import('@/components/Song/SongResources'));

const InView = lazy(() =>
  import('react-intersection-observer').then(mod => ({ default: mod.InView })),
);

type TSongProps = TSong & {
  directory: string;
};

export const Song = (props: TSongProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  const [showLyrics, setShowLyrics] = useSessionStorage(props.title + '-show-lyrics', false);
  const [lyrics, setLyrics] = useSessionStorage(props.title + '-lyrics', [] as string[][]);

  const fetchLyrics = () => {
    if (import.meta.env.DEV || lyrics.length === 0) {
      fetchArchivedJSON(
        `${import.meta.env.BASE_URL}songs/${props.directory}/lyrics.min.json.gz.bin`,
        `${import.meta.env.BASE_URL}songs/${props.directory}/lyrics.min.json`,
        `${import.meta.env.BASE_URL}songs/${props.directory}/lyrics.json`,
        json => setLyrics((json as { lyrics: TSongSectionLyrics[] }).lyrics),
        error => {
          console.error('Failed to fetch song lyrics:', error);
        },
      );
    }
  };

  return (
    <Container
      maxW={['100vw', '5xl']}
      padding={['25px 0px', '2em 1em']}
      borderRadius={['0em', '0.5em']}
      height='100%'
      overflowY='scroll'
      // [*] theme colors
      backgroundColor={theme.background}
    >
      <SongHeader
        directory={props.directory}
        title={props.title}
        artists={props.artists}
        capo={props.capo}
        type={props.type}
        contributors={props.contributors}
        lyrics={props.lyrics}
        lyricsShown={showLyrics}
        onToggleLyrics={() => {
          setShowLyrics(!showLyrics);
          fetchLyrics();
        }}
        res={props.res}
      />

      <Box
        padding={['1.5rem 10px', '1.5rem 1rem']}
        borderRadius='1rem'
        // [*] theme colors
        backgroundColor={theme.items.background}
      >
        <SongChordsList chordIDs={props.chordIDs} />

        <SongSections
          sections={props.sections}
          order={props.order}
          strumms={props.strumms}
          showLyrics={showLyrics && lyrics.length > 0}
          lyrics={lyrics}
        />
      </Box>

      {props.notes.length > 0 && (
        <Suspense fallback={<Loading />}>
          <SongNotes notes={props.notes} />
        </Suspense>
      )}

      <InView triggerOnce rootMargin='300px'>
        {({ inView, ref }) => (
          <Suspense fallback={<Loading />}>
            <Box ref={ref}>{inView ? <SongResources res={props.res} /> : null}</Box>
          </Suspense>
        )}
      </InView>
    </Container>
  );
};

export default Song;
