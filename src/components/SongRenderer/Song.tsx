/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render song based on given config.
 */

import { Box, Divider, Heading } from '@chakra-ui/react';
import React from 'react';
import { SongSegment, type ISegmentProps } from './SongSegment';

interface IResource {
  alias: string;
  author: string;
  link: string;
}

export interface ISongProps {
  title: string;
  artists: string[];
  capo: number;
  songSegments: Record<string, ISegmentProps>;
  songSegmentsOrder: string[];
  resources: IResource[];
}

export const Song = (props: ISongProps) => {
  console.log(props);

  return (
    <Box bgColor='blue.300' padding='2em 1em'>
      <Heading as='h1' size='lg' mb='0.5em' textAlign='center'>
        {props.title}
      </Heading>
      <Heading as='h2' size='sm' mb='0.5em' textAlign='center'>
        {props.artists.map((artist, index) => (
          <React.Fragment key={index}>
            {artist}
            {index < props.artists.length - 1 && ', '}
          </React.Fragment>
        ))}
      </Heading>

      <Box bgColor='blue.400' padding='1.5em 1em'>
        {props.songSegmentsOrder.map((songSegmentName, index) => {
          const songSegmentData = props.songSegments[songSegmentName];
          console.assert(
            songSegmentData !== undefined,
            `Failed to find song segment data for "${songSegmentName}"`
          );
          return (
            <React.Fragment key={`${songSegmentName}-${index}`}>
              <SongSegment {...songSegmentData} />
              <Divider mb='1em' />
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};
