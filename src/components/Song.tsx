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

import { Box, Divider, Flex, Heading, Tag, Text } from '@chakra-ui/react';
import React from 'react';

type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux';

interface ISegment {
  chordIDs: string[];
  chordTimes: number;
  strummingPattern: TStrummingMove[];
}

const Segment = (props: ISegment) => {
  return (
    <Flex alignItems='center' gap='1em'>
      <Flex direction='column' alignItems='center' gap='1em'>
        <Flex direction='row' gap='1em'>
          {props.chordIDs.map((chordId, index) => {
            return (
              <Box as='span' key={index}>
                <Tag backgroundColor='blue.200' fontWeight='bold'>
                  {chordId}
                </Tag>
              </Box>
            );
          })}
        </Flex>

        <Box position='relative'>
          <Flex direction='row' gap='0.5em' alignItems='end'>
            {props.strummingPattern.map((pattern, index) => {
              return (
                <Text key={index} fontWeight='bold'>
                  {pattern}
                </Text>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

interface IPatternProps {
  times: number;
  segments: ISegment[];
}

const Pattern = (props: IPatternProps) => {
  return (
    <Flex direction='row' gap='1em' alignItems='center'>
      <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
      {props.segments.map((segment, segmentIndex) => (
        <React.Fragment key={segmentIndex}>
          <Segment {...segment} />

          <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
        </React.Fragment>
      ))}
      <Tag size='sm' fontWeight='bold' backgroundColor='blue.200'>
        x{props.times}
      </Tag>
    </Flex>
  );
};

interface ISongSegmentProps {
  name: string;
  type: 'chords' | 'strings';
  patterns: IPatternProps[];
}

const SongSegment = (props: ISongSegmentProps) => {
  console.log(props);

  return (
    <Box alignItems='center' mb='1em'>
      <Heading as='h3' size='md' mb='1em' textAlign='center' textTransform='capitalize'>
        {props.name}
      </Heading>

      <Flex direction='column' alignItems='center' gap='1em'>
        {props.patterns.map((pattern, patternIndex) => (
          <Pattern key={patternIndex} {...pattern} />
        ))}
      </Flex>
    </Box>
  );
};

interface IResource {
  alias: string;
  author: string;
  link: string;
}

export interface ISongProps {
  title: string;
  artists: string[];
  capo: number;
  songSegments: Record<string, ISongSegmentProps>;
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
