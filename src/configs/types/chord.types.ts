/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Chords types for json mapping.
 */

export type TFingerAndString = {
  finger: number;
  string: number;
};

export type TFret = TFingerAndString[];

export type TChord = {
  name: string;
  frets: TFret[];
};

export type TChordsIndex = Record<string, TChord>;
