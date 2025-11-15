/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Chords.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Chords renderer.
 */

import type {
  TStrummingSectionData,
  TSongSectionLyrics,
  TFingerStyleSectionData,
  TStrummingPattern,
} from '@/common/types/song.types';
import { StrummingChords } from '@/components/Song/Sections/Chords/Strumming';
import { FingerStyleChords } from '@/components/Song/Sections/Chords/FingerStyle';

type TChordsProps = {
  type: 'str' | 'fs' | string;
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
  data: TStrummingSectionData | TFingerStyleSectionData;
};

export const Chords = (props: TChordsProps) => {
  switch (props.type) {
    case 'str':
      return (
        <StrummingChords
          {...(props.data as TStrummingSectionData)}
          strumms={props.strumms}
          showLyrics={props.showLyrics}
          lyrics={props.lyrics}
        />
      );
    case 'fs':
      return <FingerStyleChords {...(props.data as TFingerStyleSectionData)} />;
      return null;
    default:
      console.warn(`Unimplemented chords type "${props.type}`);
      return <></>;
  }
};
