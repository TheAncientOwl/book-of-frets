/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppStateContext.tsx
 * @author Alexandru Delegeanu
 * @version 0.9
 * @description App state context.
 */

import type { TAppState } from '@/state/state.type';
import DefaultAppTheme from '@/state/theme/default.json';
import { createContext } from 'react';

export const AppStateContext = createContext<TAppState>({
  chordsIndex: {},

  appTheme: DefaultAppTheme,
  setAppTheme: undefined,
  appLogoURL: `${import.meta.env.BASE_URL}book-of-frets.svg`,
  setAppLogoURL: undefined,

  songSettings: {
    display: {
      times: {
        value: true,
        set: null,
      },
      chordTimes: {
        value: true,
        set: null,
      },
      strummingPattern: {
        value: true,
        set: null,
      },
    },
  },
});
