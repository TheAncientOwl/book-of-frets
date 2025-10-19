/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.30
 * @description Render song based on given config.
 */

import type { TSong } from '@/common/types/song.types';
import { SongChordsList } from '@/components/SongRenderer/SongChordsList';
import { SongHeader } from '@/components/SongRenderer/SongHeader';
import { SongNotes } from '@/components/SongRenderer/SongNotes';
import { SongResources } from '@/components/SongRenderer/SongResources';
import { SongSegments } from '@/components/SongRenderer/SongSegments';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Container } from '@chakra-ui/react';

type TSongProps = TSong & {
  directory: string;
};

export const Song = (props: TSongProps) => {
  const { song: theme } = useAppTheme();

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

      <SongNotes notes={props.notes} />

      <SongResources res={props.res} />
    </Container>
  );
};
