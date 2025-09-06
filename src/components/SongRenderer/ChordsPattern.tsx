/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsPattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.14
 * @description Render song chords pattern.
 */

import { Fragment } from 'react';

import { Box, Divider, Tag, Tooltip } from '@chakra-ui/react';

import type { TChordsPattern } from '@/types/song.types';

import { ChordsPatternSegment } from '@/components/SongRenderer/ChordsPatternSegment.tsx';

type TChordsPatternProps = TChordsPattern & {
  showChordTimes: boolean;
};

const ChordsPatternDivider = () => (
  <Divider
    orientation='vertical'
    height={['0px', '80px']}
    borderWidth='thin'
    borderStyle={['dashed', 'solid']}
    mt={['15px', '0px']}
    mb={['15px', '0px']}
  />
);

export const ChordsPattern = (props: TChordsPatternProps) => {
  return (
    <Box
      width='100%'
      position='relative'
      display={['box', 'flex']}
      gap='1em'
      alignItems='center'
      justifyContent='center'
    >
      <ChordsPatternDivider />

      {props.segments.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          <ChordsPatternSegment {...segment} showChordTimes={props.showChordTimes} />

          <ChordsPatternDivider />
        </Fragment>
      ))}

      <Tooltip label={`Repeat ${props.times} times`}>
        <Tag
          size='sm'
          fontWeight='bold'
          position='absolute'
          top='50%'
          right='0'
          transform='translate(0%, -50%)'
          zIndex={1}
        >
          x{props.times}
        </Tag>
      </Tooltip>
    </Box>
  );
};
