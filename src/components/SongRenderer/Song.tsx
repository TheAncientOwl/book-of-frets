/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.34
 * @description Render song based on given config.
 */

import type { TSong } from '@/common/types/song.types';
import { Loading } from '@/components/Loading/Loading';
import { SongChordsList } from '@/components/SongRenderer/SongChordsList';
import { SongHeader } from '@/components/SongRenderer/SongHeader';
import { SongSegments } from '@/components/SongRenderer/SongSegments';
import { useAppStore } from '@/store/index';
import { Box, Container } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

const SongNotes = lazy(() => import('@/components/SongRenderer/SongNotes'));
const SongResources = lazy(() => import('@/components/SongRenderer/SongResources'));

const InView = lazy(() =>
  import('react-intersection-observer').then(mod => ({ default: mod.InView }))
);

type TSongProps = TSong & {
  directory: string;
};

export const Song = (props: TSongProps) => {
  const theme = useAppStore(state => state.appTheme.song);

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
      />

      <Box
        padding={['1.5rem 10px', '1.5rem 1rem']}
        borderRadius='1rem'
        // [*] theme colors
        backgroundColor={theme.chunks.background}
      >
        <SongChordsList chordIDs={props.chordIDs} />

        <SongSegments segments={props.segments} order={props.order} strumms={props.strumms} />
      </Box>

      {props.notes.length > 0 && (
        <Suspense fallback={<Loading />}>
          <SongNotes notes={props.notes} />
        </Suspense>
      )}

      <InView triggerOnce rootMargin='300px'>
        {({ inView, ref }) => (
          <Box ref={ref}>{inView ? <SongResources res={props.res} /> : null}</Box>
        )}
      </InView>
    </Container>
  );
};
