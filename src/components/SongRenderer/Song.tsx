/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.13
 * @description Render song based on given config.
 */

import { Fragment } from 'react';

import {
  Box,
  Circle,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import type { TChordsPattern, TSong } from '@/types/song.types';

import { SongSegment } from '@/components/SongRenderer/SongSegment';
import { GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';

type TSongProps = TSong & {
  directory: string;
};

const typeToIcon = {
  acoustic: <GiGuitarHead />,
  electric: <GiGuitarBassHead />,
};

export const Song = (props: TSongProps) => {
  return (
    <Container
      maxW={['100vw', '5xl']}
      backgroundColor='#237738ff'
      padding={['25px 10px', '2em 1em']}
      borderRadius='1rem'
    >
      <Flex direction='column' alignItems='center' mb='15px'>
        <Box position='relative' width={['70px', '80px']} height={['70px', '80px']} mb={['5px']}>
          <Image
            src={`${import.meta.env.BASE_URL}songs/${props.directory}/cover.jpeg`}
            alt={`${props.title} cover`}
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='10px'
            borderStyle='solid'
          />

          <Circle
            position='absolute'
            right='0'
            top='0'
            transform='translate(50%, -50%)'
            size='1em'
            padding='15px'
            bg='green.300'
            color='green.900'
            fontWeight='bold'
            borderColor='green.400'
            borderWidth='thin'
          >
            <Flex alignItems='end'>
              <Text fontSize='sm'>C</Text>
              <Text fontSize='xs'>{props.capo}</Text>
            </Flex>
          </Circle>
        </Box>

        <Heading
          noOfLines={1}
          as='h1'
          size={['sm', 'md']}
          mb={['5px']}
          color='CaptionText'
          textAlign='center'
        >
          {props.title}
        </Heading>

        <Heading
          noOfLines={1}
          as='h2'
          size={['xs', 'sm']}
          mb={['5px']}
          fontStyle='italic'
          textAlign='center'
        >
          {props.artists.map((artist, index) => (
            <Box key={index} as='span'>
              {artist} {index < props.artists.length - 1 && ', '}
            </Box>
          ))}
        </Heading>

        <Flex justifyContent='center'>
          {props.type.map((item, index) => (
            <Fragment key={index}>
              <Tooltip label={item}>{typeToIcon[item as keyof typeof typeToIcon]}</Tooltip>
            </Fragment>
          ))}
        </Flex>
      </Flex>

      <Flex
        direction='column'
        gap='5px'
        bgColor='blackAlpha.400'
        padding='1.5em 1em'
        borderRadius='1rem'
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
              <Divider borderColor='gray.600' mb='1em' />
            </Fragment>
          );
        })}
      </Flex>
    </Container>
  );
};
