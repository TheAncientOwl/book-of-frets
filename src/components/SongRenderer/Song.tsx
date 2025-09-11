/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.22
 * @description Render song based on given config.
 */

import { Container } from '@chakra-ui/react';

import type { TSong } from '@/types/song.types';

import { SongHeader } from '@/components/SongRenderer/SongHeader';
import { SongResources } from '@/components/SongRenderer/SongResources';
import { SongSegments } from '@/components/SongRenderer/SongSegments';
import { useAppTheme } from '@/context/AppState';

type TSongProps = TSong & {
  directory: string;
};

export const Song = (props: TSongProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Container
      maxW={['100vw', '5xl']}
      padding={['25px 10px', '2em 1em']}
      borderRadius='1rem'
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
      />

      <SongSegments songSegments={props.songSegments} songSegmentsOrder={props.songSegmentsOrder} />

      <SongResources resources={props.resources} />
    </Container>
  );
};
