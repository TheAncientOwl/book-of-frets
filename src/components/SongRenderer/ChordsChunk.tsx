/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.27
 * @description Render song chords pattern.
 */

import type {
  TChordsChunk,
  TSongSegmentLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { ChordsChunkItem } from '@/components/SongRenderer/ChordsChunkItem';
import { useAppStore, useShallowAppStore } from '@/store/index';
import { Box, Divider, Text, Tooltip, type DividerProps } from '@chakra-ui/react';
import { Fragment } from 'react';

type TChordsChunkProps = TChordsChunk & {
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSegmentLyrics;
};

export const ChordsChunkDivider = (props: DividerProps & TChordsChunk) => {
  const theme = useAppStore(state => state.appTheme.song);

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
  const { theme, settingsDisplaySegmentTimes } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    settingsDisplaySegmentTimes: state.songSettings.display.segmentTimes,
  }));

  const showTimes = settingsDisplaySegmentTimes && props.times > 1;

  return (
    <Fragment>
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

      <Box padding={['0.3em 1em', '0.5em 1em']} maxWidth='100%'>
        {props.showLyrics && (
          <Text
            whiteSpace='pre'
            overflow='auto'
            fontFamily='monospace'
            // [*] theme colors
            // TODO: add separate theme entry for lyrics
            color={theme.chunks.item.chordsPattern.times}
          >
            {props.lyrics.map((lyrics, index) => (
              <Fragment key={index}>
                {lyrics.slice(1)}
                <br />
                {index < props.lyrics.length - 1 && lyrics.charAt(0) === 'L' && (
                  <Box height={['15px', '10px']}></Box>
                )}
              </Fragment>
            ))}
          </Text>
        )}
      </Box>
    </Fragment>
  );
};
