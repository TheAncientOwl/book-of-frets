/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Chords.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Chords renderer.
 */

import type {
  TStrummingChords,
  TSongSectionLyrics,
  TTabChords,
  TStrummingPattern,
} from '@/common/types/song.types';
import { StrummingChords } from '@/components/Song/Sections/Chords/Strumming';
import { TabChords } from '@/components/Song/Sections/Chords/Tab';

type TChordsProps = {
  type: 'str' | 'tab';
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
  data: TStrummingChords | TTabChords;
};

export const Chords = (props: TChordsProps) => {
  switch (props.type) {
    case 'str':
      return (
        <StrummingChords
          {...(props.data as TStrummingChords)}
          strumms={props.strumms}
          showLyrics={props.showLyrics}
          lyrics={props.lyrics}
        />
      );
    case 'tab':
      return <TabChords {...(props.data as TTabChords)} />;
      return null;
    default:
      console.warn(`Unimplemented chords type "${props.type}`);
      return <></>;
  }
};
