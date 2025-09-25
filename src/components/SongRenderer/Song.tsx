/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.25
 * @description Render song based on given config.
 */

import { SongHeader } from '@/components/SongRenderer/SongHeader';
import { SongNotes } from '@/components/SongRenderer/SongNotes';
import { SongResources } from '@/components/SongRenderer/SongResources';
import { SongSegments } from '@/components/SongRenderer/SongSegments';
import { useAppTheme } from '@/context/AppState';
import type { TSong } from '@/types/song.types';
import { Container } from '@chakra-ui/react';

type TSongProps = TSong & {
  directory: string;
};

export const Song = (props: TSongProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Container
      maxW={['100vw', '5xl']}
      padding={['25px 10px', '2em 1em']}
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

      <SongSegments songSegments={props.songSegments} songSegmentsOrder={props.songSegmentsOrder} />

      <SongNotes notes={props.notes} />

      <SongResources resources={props.resources} />
    </Container>
  );
};
