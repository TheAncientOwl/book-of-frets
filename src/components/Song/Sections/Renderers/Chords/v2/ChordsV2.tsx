/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsV2.tsx
 * @author Alexandru Delegeanu
 * @version 2.8
 * @description Render song chords section.
 */

import type {
  TChordsV2SectionData,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { ChordsV2LineRenderer } from '@/components/Song/Sections/Renderers/Chords/v2/ChordsV2LineRenderer';
import { Loading } from '@/ui/Loading';
import { Flex } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

const ChordsV1Lyrics = lazy(() =>
  import('@/components/Song/Sections/Renderers/Chords/v1/Lyrics').then(mod => ({
    default: mod.ChordsV1Lyrics,
  })),
);

export type TChordsSectionProps = {
  data: TChordsV2SectionData;
  strummingPatterns: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
};

export const ChordsV2Renderer = (props: TChordsSectionProps) => {
  return (
    <Flex direction='column' justifyContent='center' alignItems='center' gap='1em'>
      <ChordsV2LineRenderer data={props.data} strummingPatterns={props.strummingPatterns} />

      <Suspense fallback={<Loading />}>
        <ChordsV1Lyrics visible={props.showLyrics} lyrics={props.lyrics} />
      </Suspense>
    </Flex>
  );
};

export default ChordsV2Renderer;
