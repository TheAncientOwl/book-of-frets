/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsV1.tsx
 * @author Alexandru Delegeanu
 * @version 2.0
 * @description Render song chords pattern.
 */

import type {
  TSongSectionLyrics,
  TStrummingPattern,
  TChordsV1SectionEntry,
} from '@/common/types/song.types';
import { ChordsV1Item } from '@/components/Song/Sections/Renderers/Chords/v1/Item';
import { ChordsV1Divider } from '@/components/Song/Sections/Renderers/Chords/v1/Divider';
import { useShallowAppStore } from '@/store/index';
import { Loading } from '@/ui/Loading/index';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import { Fragment, lazy, Suspense } from 'react';

const ChordsV1Lyrics = lazy(() =>
  import('@/components/Song/Sections/Renderers/Chords/v1/Lyrics').then(mod => ({
    default: mod.ChordsV1Lyrics,
  })),
);

type TChordsV1Props = {
  data: TChordsV1SectionEntry[];
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
};

export const ChordsV1Renderer = (props: TChordsV1Props) => {
  const { theme, settingsDisplaySectionTimes } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    settingsDisplaySectionTimes: state.songSettings.display.sectionTimes,
  }));

  return (
    <>
      {props.data.map((curr, idx) => {
        const showTimes = settingsDisplaySectionTimes && curr.times > 1;

        return (
          <Fragment key={idx}>
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
              <ChordsV1Divider display={['none', 'block']} borderStyle={['solid']} />

              {curr.items.map((item, itemIndex) => (
                <Fragment key={itemIndex}>
                  <ChordsV1Item items={item} strumms={props.strumms} />

                  <ChordsV1Divider
                    borderStyle={['none', 'solid']}
                    display={[
                      itemIndex < curr.items.length - (showTimes ? 2 : 1) ? 'block' : 'none',
                      'block',
                    ]}
                  />
                </Fragment>
              ))}

              {showTimes && (
                <Tooltip
                  label={`Repeat ${curr.times} times`}
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
                    x{curr.times}
                  </Text>
                </Tooltip>
              )}
            </Box>

            {props.showLyrics && (
              <Suspense fallback={<Loading />}>
                <ChordsV1Lyrics visible={props.showLyrics} lyrics={props.lyrics} />
              </Suspense>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
