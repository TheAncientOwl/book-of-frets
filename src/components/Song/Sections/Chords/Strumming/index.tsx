/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsChunk.tsx
 * @author Alexandru Delegeanu
 * @version 0.29
 * @description Render song chords pattern.
 */

import type {
  TSongSectionLyrics,
  TStrummingPattern,
  TStrummingChords,
} from '@/common/types/song.types';
import { StrummingChordsItem } from '@/components/Song/Sections/Chords/Strumming/Item';
import { StrummingChordsDivider } from '@/components/Song/Sections/Chords/Strumming/Divider';
import { useShallowAppStore } from '@/store/index';
import { Loading } from '@/ui/Loading/index';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { Fragment, lazy, Suspense } from 'react';

const StrummingChordsLyrics = lazy(() =>
  import('@/components/Song/Sections/Chords/Strumming/Lyrics').then(mod => ({
    default: mod.StrummingChordsLyrics,
  }))
);

type TChordsChunkProps = TStrummingChords & {
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
};

export const StrummingChords = (props: TChordsChunkProps) => {
  const { theme, settingsDisplaySectionTimes } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    settingsDisplaySectionTimes: state.songSettings.display.sectionTimes,
  }));

  const showTimes = settingsDisplaySectionTimes && props.times > 1;

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
        borderColor={theme.items.item.chordsPattern.divider}
      >
        <StrummingChordsDivider display={['none', 'block']} borderStyle={['solid']} />

        {props.items.map((section, sectionIndex) => (
          <Fragment key={sectionIndex}>
            <StrummingChordsItem data={section} strumms={props.strumms} />

            <StrummingChordsDivider
              borderStyle={['none', 'solid']}
              display={[
                sectionIndex < props.items.length - (showTimes ? 2 : 1) ? 'block' : 'none',
                'block',
              ]}
            />
          </Fragment>
        ))}

        {showTimes && (
          <Tooltip
            label={`Repeat ${props.times} times`}
            // [*] theme colors
            borderColor={theme.items.item.chordsPattern.divider}
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
              color={theme.items.item.chordsPattern.chord.times.color}
            >
              x{props.times}
            </Text>
          </Tooltip>
        )}
      </Box>

      <Suspense fallback={<Loading />}>
        <StrummingChordsLyrics visible={props.showLyrics} lyrics={props.lyrics} />
      </Suspense>
    </Fragment>
  );
};
