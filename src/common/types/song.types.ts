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

export type TFingerStyleChords = {
  times: number;
  items: string;
};

export type TSongSection = {
  name: string;
  type: 'str' | 'fs';
  times: number;
  chords: TStrummingChords[] | TFingerStyleChords[];
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
