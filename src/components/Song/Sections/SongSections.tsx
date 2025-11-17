/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSections.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Render song sections data.
 */

import type {
  TSongSection,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { SongSection } from '@/components/Song/Sections/SongSection';

type TSongSectionsProps = {
  sections: Record<string, TSongSection>;
  order: string[];
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics[];
};

export const SongSections = (props: TSongSectionsProps) => {
  return (
    <>
      {props.order.map((songSectionName, index) => {
        const songSectionData = props.sections[songSectionName];
        console.assert(
          songSectionData !== undefined,
          `Failed to find song section data for "${songSectionName}"`
        );

        return (
          <SongSection
            key={`${songSectionName}-${index}`}
            {...songSectionData}
            strumms={props.strumms}
            showLyrics={props.showLyrics}
            lyrics={props.lyrics[index]}
          />
        );
      })}
    </>
  );
};
