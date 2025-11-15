/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSection.tsx
 * @author Alexandru Delegeanu
 * @version 0.24
 * @description Render song section.
 */

import type {
  TChordsChunk,
  TSongSection,
  TSongSectionLyrics,
  TStringsChunk,
  TStrummingPattern,
} from '@/common/types/song.types';
import { ChordsChunk } from '@/components/Song/Sections/Chunk/Chords/ChordsChunk';
import { StringsChunk } from '@/components/Song/Sections/Chunk/Strings/StringsChunk';
import { useAppStore } from '@/store/index';
import { Flex, Heading, Tag, Text } from '@chakra-ui/react';

type TSongSectionProps = TSongSection & {
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
};

export const SongSectionHeading = (props: TSongSectionProps) => {
  const theme = useAppStore(state => state.appTheme.song);

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

export const SongSectionBody = (props: TSongSectionProps) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      gap='1em'
      padding={['1.1em 0em', '1.1em 1em']}
      overflowX={['auto', 'hidden']}
    >
      {props.chunks.map((chunk, chunkIdx) => {
        if (props.type === 'chords') {
          return (
            <ChordsChunk
              key={chunkIdx}
              {...(chunk as TChordsChunk)}
              strumms={props.strumms}
              showLyrics={props.showLyrics}
              lyrics={props.lyrics}
            />
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
