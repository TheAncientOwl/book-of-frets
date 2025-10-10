/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file default.ts
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description Default app state.
 */

import type { TChordsIndex } from '@/common/types/chord.types';
import type { TSongsIndexEntry } from '@/common/types/song.types';
import DefaultAppTheme from '@/state/theme/default.min.json';
import type { TAppTheme } from '@/state/theme/types';
import { type Dispatch, type SetStateAction } from 'react';

type TState<T> = {
  value: T;
  set: Dispatch<SetStateAction<T>> | null;
};

export type TSongHistoryEntry = Pick<TSongsIndexEntry, 'title' | 'artists' | 'directory'>;

export type TAppState = {
  chordsIndex: TChordsIndex;
  appTheme: TState<TAppTheme>;
  appLogoURL: TState<string>;
  songsHistory: TState<TSongHistoryEntry[]>;
  songSettings: {
    display: {
      times: TState<boolean>;
      chordTimes: TState<boolean>;
      strummingPattern: TState<boolean>;
    };
  };
};

const initState = <T>(value: T): TState<T> => ({ value, set: null });

export const DefaultAppState: TAppState = {
  chordsIndex: {},
  appTheme: initState(DefaultAppTheme),
  appLogoURL: initState(`${import.meta.env.BASE_URL}logo.svg`),
  songsHistory: initState([] as TSongHistoryEntry[]),
  songSettings: {
    display: {
      times: initState(true),
      chordTimes: initState(true),
      strummingPattern: initState(true),
    },
  },
};
