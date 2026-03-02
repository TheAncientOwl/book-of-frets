/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsV2LineDelimiter.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description .
 */

import { useShallowAppStore } from '@/store/index';
import { Box } from '@chakra-ui/react';

type TChordLineDelimiter = {
  positioning: 'begin' | 'end' | 'between';
  horizontalSpacing?: string;
};

export const ChordsV2LineDelimiter = (props: TChordLineDelimiter) => {
  const { theme } = useShallowAppStore(state => ({
    theme: state.appTheme.song,
  }));

  const horizontalSpacing = props.horizontalSpacing ?? '-1.5em';

  return (
    <Box
      zIndex={1}
      position={props.positioning !== 'between' ? 'absolute' : 'relative'}
      alignSelf='stretch'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      left={props.positioning === 'begin' ? horizontalSpacing : undefined}
      right={props.positioning === 'end' ? horizontalSpacing : undefined}
      borderRight={
        props.positioning === 'begin' || props.positioning === 'between' ? '1.5px solid' : 'none'
      }
      borderLeft={props.positioning === 'end' ? '1.5px solid' : 'none'}
      // [*] theme colors
      borderColor={theme.items.item.chordsPattern.divider}
    ></Box>
  );
};
