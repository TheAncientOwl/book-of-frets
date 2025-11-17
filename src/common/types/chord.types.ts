/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file song.types.ts
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Chords types for json mapping.
 */

import type { TGuitarString } from '@/common/types/common.types';

export type TFret = Partial<Record<TGuitarString, number>>;

export type TChord = {
  name: string;
  startFret?: number;
  frets: TFret[];
};

export type TChordsIndex = Record<string, TChord>;
