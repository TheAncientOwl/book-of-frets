/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppState.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description App component.
 */

import DefaultAppTheme from '@/theme/default.json';
import type { TAppTheme } from '@/theme/types';
import type { TChordsIndex } from '@/types/chord.types';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type TAppState = {
  chordsIndex: TChordsIndex;
  appTheme: TAppTheme;
  setAppTheme: Dispatch<SetStateAction<TAppTheme>> | undefined;
  appLogoURL: string;
  setAppLogoURL: Dispatch<SetStateAction<string>> | undefined;
};

export const AppState = createContext<TAppState>({
  chordsIndex: {},
  appTheme: DefaultAppTheme,
  setAppTheme: undefined,
  appLogoURL: `${import.meta.env.BASE_URL}book-of-frets.svg`,
  setAppLogoURL: undefined,
});

export const useAppStateContext = () => {
  const context = useContext(AppState);
  if (!context) {
    throw new Error('useAppStateContext must be used within an AppState.Provider');
  }
  return context;
};

export const useAppTheme = () => {
  const context = useContext(AppState);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppState.Provider');
  }
  return context.appTheme;
};
