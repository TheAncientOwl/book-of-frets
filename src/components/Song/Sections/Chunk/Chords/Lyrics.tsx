/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Lyrics.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Chords chunk lyrics component.
 */

import type { TSongSectionLyrics } from '@/common/types/song.types';
import { useAppStore } from '@/store/index';
import { Box, Text } from '@chakra-ui/react';
import { Fragment } from 'react/jsx-runtime';

type TChordsChunkLyrics = {
  visible: boolean;
  lyrics: TSongSectionLyrics;
};

export const ChordsChunkLyrics = (props: TChordsChunkLyrics) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <>
      {props.visible && (
        <Text
          padding={['0.3em 1em', '0.5em 1em']}
          maxWidth='100%'
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
                <Box as='span' height={['15px', '10px']} />
              )}
            </Fragment>
          ))}
        </Text>
      )}
    </>
  );
};

export default ChordsChunkLyrics;
