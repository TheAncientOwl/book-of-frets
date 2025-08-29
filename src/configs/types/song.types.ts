/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Song types for json mapping.
 */

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux';

export type TChordsPatternSegment = {
  chordIDs: string[];
  chordTimes: number;
  strummingPattern: TStrummingMove[];
};

export type TChordsPattern = {
  times: number;
  segments: TChordsPatternSegment[];
};

export type TSongSegment = {
  name: string;
  type: 'chords' | 'strings';
  patterns: TChordsPattern[];
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
  songSegments: Record<string, TSongSegment>;
  songSegmentsOrder: string[];
  resources: TResource[];
};
