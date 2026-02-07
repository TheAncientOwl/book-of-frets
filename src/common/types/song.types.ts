/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Song types for json mapping.
 */

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux' | 'X' | 'De' | 'Dx';

export type TStrummingPattern = TStrummingMove[];

export type TAlignType = 'center' | 'flex-start' | 'flex-end';

export type TStrummingChordsItem = string[][];

export type TStrummingChords = {
  times: number;
  items: TStrummingChordsItem[];
};

export type TTabChords = {
  times: number;
  items: string;
};

export type TChordsSectionItem = string[];

export type TSongSectionType = 'chords-v1' | 'chords-v2' | 'gtab-v1';

export type TSongSection = {
  name: string;
  type: TSongSectionType;
  times: number;
  data: TStrummingChords[] | TTabChords[] | TChordsSectionItem[];
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
