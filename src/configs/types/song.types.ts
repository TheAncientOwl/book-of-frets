/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Song types for json mapping.
 */

export type TStrummingMove = '-' | 'D' | 'U' | 'Dx' | 'Ux';

export interface IPatternSegment {
  chordIDs: string[];
  chordTimes: number;
  strummingPattern: TStrummingMove[];
}

export interface IPattern {
  times: number;
  segments: IPatternSegment[];
}

export interface ISongSegment {
  name: string;
  type: 'chords' | 'strings';
  patterns: IPattern[];
}

export interface IResource {
  alias: string;
  author: string;
  link: string;
}

export interface ISong {
  title: string;
  artists: string[];
  capo: number;
  songSegments: Record<string, ISongSegment>;
  songSegmentsOrder: string[];
  resources: IResource[];
}
