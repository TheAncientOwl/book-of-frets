/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 0.9
 * @description Song types for json mapping.
 */

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux' | 'X' | 'De' | 'Dx';

export type TChordsChunkItem = {
  chordIDs: string[];
  chordTimes: number;
  strummingPattern: TStrummingMove[];
};

export type TChordsChunk = {
  times: number;
  items: TChordsChunkItem[];
};

export type TStringFret = {
  string: number;
  fret: number;
};

export type TStringsChunkItem = TStringFret[];

export type TStringsChunk = {
  times: number;
  items: TStringsChunkItem[];
};

export type TSongSegment = {
  name: string;
  type: 'chords' | 'strings';
  times: number;
  chunks: TChordsChunk[] | TStringsChunk[];
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
  type: string[];
  contributors: string[];
};

export type TSongsIndexEntry = {
  title: string;
  artists: string[];
  directory: string;
  chordIDs: string[];
  type: string[];
};
