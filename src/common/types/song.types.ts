/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 2.1
 * @description Song types for json mapping.
 */

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux' | 'X' | 'De' | 'Dx';

export type TStrummingPattern = TStrummingMove[];

export type TAlignType = 'center' | 'flex-start' | 'flex-end';

export type TStrummingChordsItem = string[][];

export type TChordsV1SectionEntry = {
  times: number;
  items: TStrummingChordsItem[];
};
export type TChordsV1SectionData = TChordsV1SectionEntry[];

export type TGTabV1SectionData = string;

export type TChordsV2SectionEntry = string[];
export type TChordsV2SectionData = TChordsV2SectionEntry;

export type TSongSectionEntryRendererType = 'chords-v1' | 'chords-v2' | 'gtab-v1';
export type TSongSectionEntryData =
  | TChordsV1SectionData
  | TGTabV1SectionData
  | TChordsV2SectionData;

export type TSongSectionEntry = {
  renderer: TSongSectionEntryRendererType;
  data: TSongSectionEntryData;
};

export type TSongSection = {
  name: string;
  times: number;
  entries: TSongSectionEntry[];
};

export type TResource = {
  alias: string;
  author: string;
  link: string;
};

export type TSong = {
  title: string;
  artists: string[];
  capo: number;
  chordIDs: string[];
  strumms: TStrummingPattern[];
  sections: Record<string, TSongSection>;
  order: string[];
  lyrics: boolean;
  res: TResource[];
  type: string[];
  contributors: string[];
  notes: string[];
};

export type TSongsIndexEntry = {
  title: string;
  artists: string[];
  directory: string;
  chordIDs: string[];
  type: string[];
};

export type TSongSectionLyrics = string[];
