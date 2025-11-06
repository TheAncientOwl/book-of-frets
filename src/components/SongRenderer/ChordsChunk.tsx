/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.25
 * @description Render song chords pattern.
 */

import type { TChordsChunk, TStrummingPattern } from '@/common/types/song.types';
import { ChordsChunkItem } from '@/components/SongRenderer/ChordsChunkItem';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Divider, Text, Tooltip, type DividerProps } from '@chakra-ui/react';
import { Fragment } from 'react';

type TChordsChunkProps = TChordsChunk & {
  strumms: TStrummingPattern[];
};

export const ChordsChunkDivider = (props: DividerProps & TChordsChunk) => {
  const { song: theme } = useAppTheme();

  return (
    <Divider
      orientation='vertical'
      height={['0px', 'auto']}
      width={['70%', '0px']}
      borderWidth='thin'
      mt={['15px', '0px']}
      mb={['15px', '0px']}
      ml={['auto', '0px']}
      mr={['auto', '0px']}
      // [*] theme colors
      borderColor={theme.chunks.item.chordsPattern.divider}
      {...props}
    />
  );
};

export const ChordsChunk = (props: TChordsChunkProps) => {
  const { song: theme } = useAppTheme();
  const { songSettings } = useAppState();

  const showTimes = songSettings.display.times.value && props.times > 1;

  return (
    <Box
      width='100%'
      position='relative'
      display={['box', 'flex']}
      gap='1em'
      alignItems='stretch'
      justifyContent='center'
      fontSize={['0.85em', '0.9em', '1em']}
      maxWidth='fit-content'
      // overflow='auto'
      border='none'
      borderWidth='thin'
      borderRight={[showTimes ? '1px solid red' : 'none', 'none']}
      paddingRight={[showTimes ? '1em' : '0em', '0em']}
      // [*] theme colors
      borderColor={theme.chunks.item.chordsPattern.divider}
    >
      <ChordsChunkDivider display={['none', 'block']} borderStyle={['solid']} {...props} />

      {props.items.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          <ChordsChunkItem data={segment} strumms={props.strumms} />

          <ChordsChunkDivider
            borderStyle={['none', 'solid']}
            display={[
              segmentIndex < props.items.length - (showTimes ? 2 : 1) ? 'block' : 'none',
              'block',
            ]}
            {...props}
          />
        </Fragment>
      ))}

      {showTimes && (
        <Tooltip
          label={`Repeat ${props.times} times`}
          // [*] theme colors
          borderColor={theme.chunks.item.chordsPattern.divider}
        >
          <Text
            size='sm'
            fontWeight='bold'
            position='absolute'
            top='50%'
            right='0'
            transform='translate(150%, -50%)'
            zIndex={1}
            // [*] theme colors
            color={theme.chunks.item.chordsPattern.chord.times.color}
          >
            x{props.times}
          </Text>
        </Tooltip>
      )}
    </Box>
  );
};
