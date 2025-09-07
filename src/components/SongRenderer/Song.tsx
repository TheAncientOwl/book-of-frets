/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.20
 * @description Render song based on given config.
 */

import { Fragment } from 'react';

import { Container, Divider, Flex } from '@chakra-ui/react';

import type { TChordsPattern, TSong } from '@/types/song.types';

import { SongHeader } from '@/components/SongRenderer/SongHeader';
import { SongResources } from '@/components/SongRenderer/SongResources';
import { SongSegment } from '@/components/SongRenderer/SongSegment';
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

      <Flex
        direction='column'
        gap='5px'
        padding='1.5em 1em'
        borderRadius='1rem'
        // [*] theme colors
        backgroundColor={theme.segments.background}
      >
        {props.songSegmentsOrder.map((songSegmentName, index) => {
          const songSegmentData = props.songSegments[songSegmentName];
          console.assert(
            songSegmentData !== undefined,
            `Failed to find song segment data for "${songSegmentName}"`
          );
          return (
            <Fragment key={`${songSegmentName}-${index}`}>
              <SongSegment
                {...songSegmentData}
                showChordTimes={Object.entries(props.songSegments).some(
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ([_, value]) =>
                    value.type === 'chords' &&
                    (value.patterns as TChordsPattern[]).some(pattern =>
                      pattern.segments.some(segment => segment.chordTimes > 1)
                    )
                )}
              />
              <Divider
                mb='1em'
                // [*] theme colors
                borderColor={theme.segments.divider}
              />
            </Fragment>
          );
        })}
      </Flex>

      <SongResources resources={props.resources} />
    </Container>
  );
};
