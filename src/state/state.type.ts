/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file state.type.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Main app state type.
 */

import type { TChordsIndex } from '@/common/types/chord.types';
import type { TAppTheme } from '@/state/theme/types';
import { type Dispatch, type SetStateAction } from 'react';

type TState<T> = {
  value: T;
  set: Dispatch<SetStateAction<T>> | null;
};

export type TAppState = {
  chordsIndex: TChordsIndex;

  appTheme: TAppTheme;
  setAppTheme: Dispatch<SetStateAction<TAppTheme>> | undefined;

  appLogoURL: string;
  setAppLogoURL: Dispatch<SetStateAction<string>> | undefined;

  songSettings: {
    display: {
      times: TState<boolean>;
      chordTimes: TState<boolean>;
      strummingPattern: TState<boolean>;
    };
  };
};
