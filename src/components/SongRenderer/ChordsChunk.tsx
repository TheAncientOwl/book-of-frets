/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.18
 * @description Render song chords pattern.
 */

import { Fragment } from 'react';

import { Box, Divider, Tag, Tooltip, type DividerProps } from '@chakra-ui/react';

import { ChordsChunkItem } from '@/components/SongRenderer/ChordsChunkItem';
import { useAppTheme } from '@/context/AppState';
import type { TChordsChunk } from '@/types/song.types';

type TChordsChunkProps = TChordsChunk & {
  showChordTimes: boolean;
};

const ChordsChunkDivider = (props: DividerProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Divider
      orientation='vertical'
      height={['0px', '80px']}
      borderWidth='thin'
      mt={['15px', '0px']}
      mb={['15px', '0px']}
      // [*] theme colors
      borderColor={theme.chunks.item.chordsPattern.divider}
      {...props}
    />
  );
};

export const ChordsChunk = (props: TChordsChunkProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Box
      width='100%'
      position='relative'
      display={['box', 'flex']}
      gap='1em'
      alignItems='center'
      justifyContent='center'
    >
      <ChordsChunkDivider borderStyle={['solid']} />

      {props.items.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          <ChordsChunkItem {...segment} showChordTimes={props.showChordTimes} />

          <ChordsChunkDivider
            borderStyle={['dashed', 'solid']}
            display={[segmentIndex < props.items.length - 1 ? 'block' : 'none', 'block']}
          />
        </Fragment>
      ))}

      <Tooltip
        label={`Repeat ${props.times} times`}
        // [*] theme colors
        borderColor={theme.chunks.item.chordsPattern.divider}
      >
        <Tag
          size='sm'
          fontWeight='bold'
          position='absolute'
          top='50%'
          right='0'
          transform='translate(0%, -50%)'
          zIndex={1}
          // [*] theme colors
          backgroundColor={theme.chunks.item.chordsPattern.chord.times.background}
          color={theme.chunks.item.chordsPattern.chord.times.color}
        >
          x{props.times}
        </Tag>
      </Tooltip>
    </Box>
  );
};
