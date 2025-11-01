/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 0.16
 * @description Song types for json mapping.
 */

import type { TGuitarString } from '@/common/types/common.types';

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux' | 'X' | 'De' | 'Dx';

export type TStrummingPattern = TStrummingMove[];

export type TAlignType = 'center' | 'flex-start' | 'flex-end';

export type TChordsChunkItem = string[];

export type TChordsChunk = {
  times: number;
  items: TChordsChunkItem[];
  align?: TAlignType[];
};

export type TGuitarStringDelimiter = '-' | '|';
export type TStringsChunkItem =
  | Partial<Record<TGuitarString, number | string>>
  | TGuitarStringDelimiter;

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
  chordIDs: string[];
  strumms: TStrummingPattern[];
  segments: Record<string, TSongSegment>;
  order: string[];
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
