/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Chords types for json mapping.
 */

export interface IFingerAndString {
  finger: number;
  string: number;
}

export type TFret = IFingerAndString[];

export interface IChord {
  name: string;
  frets: TFret[];
}

export type TChordsIndex = Record<string, IChord>;
