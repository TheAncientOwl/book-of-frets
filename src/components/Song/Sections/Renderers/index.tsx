/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Chords.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Chords renderer.
 */

import type {
  TChordsSectionItem,
  TSongSectionLyrics,
  TSongSectionType,
  TStrummingChords,
  TStrummingPattern,
  TTabChords,
} from '@/common/types/song.types';
import { ChordsV1 } from '@/components/Song/Sections/Renderers/Chords/v1';
import { ChordsSection } from '@/components/Song/Sections/Renderers/Chords/v2/index';
import { GuitarTabsV1 } from '@/components/Song/Sections/Renderers/GuitarTabs/v1';

type TChordsProps = {
  type: TSongSectionType;
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
  data: TStrummingChords[] | TTabChords[] | TChordsSectionItem[];
};

export const SectionRenderer = (props: TChordsProps) => {
  switch (props.type) {
    case 'chords-v1':
      return (
        <ChordsV1
          data={props.data as TStrummingChords[]}
          strumms={props.strumms}
          showLyrics={props.showLyrics}
          lyrics={props.lyrics}
        />
      );
    case 'chords-v2':
      return (
        <ChordsSection
          data={props.data as TChordsSectionItem[]}
          strummingPatterns={props.strumms}
          showLyrics={props.showLyrics}
          lyrics={props.lyrics}
        />
      );
    case 'gtab-v1':
      return (
        <>
          <GuitarTabsV1 data={props.data as TTabChords[]} />
        </>
      );

    default:
      console.error(`Unimplemented chords type "${props.type}`);
      return <></>;
  }
};
