/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.20
 * @description Render song chords pattern.
 */

import { ChordsChunkItem } from '@/components/SongRenderer/ChordsChunkItem';
import { useAppStateContext, useAppTheme } from '@/context/AppState';
import type { TChordsChunk } from '@/types/song.types';
import { Box, Divider, Tag, Tooltip, type DividerProps } from '@chakra-ui/react';
import { Fragment } from 'react';

type TChordsChunkProps = TChordsChunk & {};

const getDividerHeight = (displayChordTimes: boolean, displayStrummingPattern: boolean): string => {
  if (displayChordTimes && displayStrummingPattern) {
    return '80px';
  }

  if (displayChordTimes) {
    return '60px';
  }

  if (displayStrummingPattern) {
    return '70px';
  }

  return '30px';
};

const ChordsChunkDivider = (props: DividerProps & TChordsChunk) => {
  const { song: theme } = useAppTheme();
  const { songSettings } = useAppStateContext();

  return (
    <Divider
      orientation='vertical'
      height={[
        '0px',
        getDividerHeight(
          songSettings.display.chordTimes.value,
          songSettings.display.strummingPattern.value
        ),
      ]}
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
  const { songSettings } = useAppStateContext();

  return (
    <Box
      width='100%'
      position='relative'
      display={['box', 'flex']}
      gap='1em'
      alignItems='center'
      justifyContent='center'
    >
      <ChordsChunkDivider borderStyle={['solid']} {...props} />

      {props.items.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          <ChordsChunkItem {...segment} />

          <ChordsChunkDivider
            borderStyle={['dashed', 'solid']}
            display={[segmentIndex < props.items.length - 1 ? 'block' : 'none', 'block']}
            {...props}
          />
        </Fragment>
      ))}

      {songSettings.display.times.value && (
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
      )}
    </Box>
  );
};
