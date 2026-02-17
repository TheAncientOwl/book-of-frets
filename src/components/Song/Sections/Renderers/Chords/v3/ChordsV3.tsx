/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file ChordsV2.tsx
 * @author Alexandru Delegeanu
 * @version 2.4
 * @description Render song chords section.
 */

import type {
  TChordsV3SectionData,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import {
  ChordsV2LineDelimiter,
  ChordsV2LineRenderer,
  ChordsV2LineTimes,
  GAP_BETWEEN_CHORD_LINES,
} from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2';
import { Loading } from '@/ui/Loading';
import { Flex } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

const ChordsV1Lyrics = lazy(() =>
  import('@/components/Song/Sections/Renderers/Chords/v1/Lyrics').then(mod => ({
    default: mod.ChordsV1Lyrics,
  })),
);

type TChordsV3SectionProps = {
  data: TChordsV3SectionData;
  strummingPatterns: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
};

export const ChordsV3Renderer = (props: TChordsV3SectionProps) => {
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' gap='1em'>
      <Flex direction='column' gap={GAP_BETWEEN_CHORD_LINES} position='relative'>
        {props.data.items.map((entry, index) => (
          <ChordsV2LineRenderer
            key={index}
            data={entry}
            strummingPatterns={props.strummingPatterns}
          />
        ))}

        <ChordsV2LineDelimiter positioning='end' horizontalSpacing='-2.5em' />

        <ChordsV2LineTimes times={`x${props.data.times}`} right='-4.2em' />
      </Flex>

      <Suspense fallback={<Loading />}>
        <ChordsV1Lyrics visible={props.showLyrics} lyrics={props.lyrics} />
      </Suspense>
    </Flex>
  );
};

export default ChordsV3Renderer;
