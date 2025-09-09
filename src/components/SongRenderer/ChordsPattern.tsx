/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsPattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.17
 * @description Render song chords pattern.
 */

import { Fragment } from 'react';

import { Box, Divider, Tag, Tooltip, type DividerProps } from '@chakra-ui/react';

import { ChordsPatternSegment } from '@/components/SongRenderer/ChordsPatternSegment.tsx';
import { useAppTheme } from '@/context/AppState';
import type { TChordsPattern } from '@/types/song.types';

type TChordsPatternProps = TChordsPattern & {
  showChordTimes: boolean;
};

const ChordsPatternDivider = (props: DividerProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Divider
      orientation='vertical'
      height={['0px', '80px']}
      borderWidth='thin'
      mt={['15px', '0px']}
      mb={['15px', '0px']}
      // [*] theme colors
      borderColor={theme.segments.item.chordsPattern.divider}
      {...props}
    />
  );
};

export const ChordsPattern = (props: TChordsPatternProps) => {
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
      <ChordsPatternDivider borderStyle={['solid']} />

      {props.segments.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          <ChordsPatternSegment {...segment} showChordTimes={props.showChordTimes} />

          <ChordsPatternDivider
            borderStyle={['dashed', 'solid']}
            display={[segmentIndex < props.segments.length - 1 ? 'block' : 'none', 'block']}
          />
        </Fragment>
      ))}

      <Tooltip
        label={`Repeat ${props.times} times`}
        // [*] theme colors
        borderColor={theme.segments.item.chordsPattern.divider}
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
          backgroundColor={theme.segments.item.chordsPattern.chord.times.background}
          color={theme.segments.item.chordsPattern.chord.times.color}
        >
          x{props.times}
        </Tag>
      </Tooltip>
    </Box>
  );
};
