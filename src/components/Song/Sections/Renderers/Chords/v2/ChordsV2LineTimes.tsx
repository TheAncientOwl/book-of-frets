/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsV2LineTimes.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description .
 */

import type { TChordsLineProps } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2LineRenderer';
import { useShallowAppStore } from '@/store/index';
import { Text, Tooltip } from '@chakra-ui/react';

export const ChordsV2LineTimes = (props: Pick<TChordsLineProps, 'times'> & { right?: string }) => {
  const { theme, settingsDisplaySectionTimes } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
    settingsDisplaySectionTimes: state.songSettings.display.sectionTimes,
  }));

  const showTimes = settingsDisplaySectionTimes && props.times !== 'x1';

  return (
    <Tooltip label={`Repeat ${props.times} times`}>
      <Text
        size='sm'
        fontWeight='bold'
        zIndex={1}
        position='absolute'
        right={props.right || '-3.25em'}
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        // [*] theme colors
        color={theme.items.item.chordsPattern.chord.times.color}
      >
        {showTimes && <>{props.times}</>}
      </Text>
    </Tooltip>
  );
};
