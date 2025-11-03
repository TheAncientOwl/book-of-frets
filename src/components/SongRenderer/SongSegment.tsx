/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSegment.tsx
 * @author Alexandru Delegeanu
 * @version 0.20
 * @description Render song segment.
 */

import type {
  TChordsChunk,
  TSongSegment,
  TStringsChunk,
  TStrummingPattern,
} from '@/common/types/song.types';
import { ChordsChunk } from '@/components/SongRenderer/ChordsChunk';
import { StringsChunk } from '@/components/SongRenderer/StringsChunk';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Flex, Heading, Tag, Text } from '@chakra-ui/react';

type TSongSegmentProps = TSongSegment & {
  strumms: TStrummingPattern[];
};

export const SongSegmentHeading = (props: TSongSegmentProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Heading
      as='h3'
      size='md'
      textAlign='center'
      textDecoration='underline'
      textTransform='capitalize'
      // [*] theme colors
      color={theme.chunks.item.title}
    >
      <Text as='span' position='relative' fontSize={['lg', 'xl']}>
        {props.name}
        {props.times > 1 && (
          <Tag
            size='sm'
            position='absolute'
            bottom={0}
            right={0}
            transform='translate(120%, 20%)'
            // [*] theme colors
            backgroundColor={theme.chunks.item.times.background}
            color={theme.chunks.item.times.color}
          >
            x{props.times}
          </Tag>
        )}
      </Text>
    </Heading>
  );
};

export const SongSegmentBody = (props: TSongSegmentProps) => {
  return (
    <Flex direction='column' alignItems='center' gap='1em' padding={['1.1em 0em', '1.1em 1em']}>
      {props.chunks.map((chunk, chunkIdx) => {
        if (props.type === 'chords') {
          return (
            <ChordsChunk key={chunkIdx} {...(chunk as TChordsChunk)} strumms={props.strumms} />
          );
        } else if (props.type === 'strings') {
          return <StringsChunk key={chunkIdx} {...(chunk as TStringsChunk)} />;
        } else {
          console.warn(`Unimplemented pattern type "${props.type}`);
          return <></>;
        }
      })}
    </Flex>
  );
};
