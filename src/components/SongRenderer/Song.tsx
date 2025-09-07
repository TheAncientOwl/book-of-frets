/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.18
 * @description Render song based on given config.
 */

import { Fragment } from 'react';

import { Container, Divider, Flex } from '@chakra-ui/react';

import type { TChordsPattern, TSong } from '@/types/song.types';

import { SongSegment } from '@/components/SongRenderer/SongSegment';

import { SongHeader } from '@/components/SongRenderer/SongHeader';
import { SongResources } from '@/components/SongRenderer/SongResources';

export type TSongTheme = {
  background: string;
  header: {
    title: string;
    artists: string;
    typeTags: string;
    coverBorder: string;
  };
  capo: {
    background: string;
    border: string;
    text: string;
  };
  segments: {
    background: string;
    item: {
      title: string;
      times: {
        background: string;
        color: string;
      };
      chordsPattern: {
        background: string;
        color: string;
        divider: string;
        times: string;
        chord: {
          background: string;
          color: string;
          segment: {
            popover: {
              background: string;
              arrow: string;
              border: string;
              closeButton: string;
            };
            times: string;
            pattern: string;
          };
          times: {
            background: string;
            color: string;
          };
        };
      };
    };
  };
  resources: {
    title: string;
    item: {
      note: string;
      alias: string;
      author: string;
    };
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const DefaultSongTheme: TSongTheme = {
  background: '#2B8C44',
  header: {
    title: 'white',
    artists: 'white',
    typeTags: 'white',
    coverBorder: 'green.500',
  },
  capo: {
    background: 'green.600',
    border: 'green.500',
    text: 'white',
  },
  segments: {
    background: 'blackAlpha.400',
    item: {
      title: 'white',
      times: {
        background: 'green.600',
        color: 'white',
      },
      chordsPattern: {
        background: 'green.600',
        color: 'white',
        divider: 'white',
        times: 'white',
        chord: {
          background: 'green.600',
          color: 'white',
          segment: {
            popover: {
              background: 'gray.900',
              arrow: 'white',
              border: 'white',
              closeButton: 'white',
            },
            times: 'white',
            pattern: 'white',
          },
          times: {
            background: 'green.500',
            color: 'white',
          },
        },
      },
    },
  },
  resources: {
    title: 'white',
    item: {
      note: 'white',
      alias: 'white',
      author: 'white',
    },
  },
};

type TSongProps = TSong & {
  directory: string;
};

export const Song = (props: TSongProps) => {
  return (
    <Container
      maxW={['100vw', '5xl']}
      padding={['25px 10px', '2em 1em']}
      borderRadius='1rem'
      // [*] theme colors
      backgroundColor={DefaultSongTheme.background}
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
        backgroundColor={DefaultSongTheme.segments.background}
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
                // borderColor='gray.600'
                mb='1em'
              />
            </Fragment>
          );
        })}
      </Flex>

      <SongResources resources={props.resources} />
    </Container>
  );
};
