/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppState.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description App component.
 */

import type { TChordsIndex } from '@/types/chord.types';
import { createContext, useContext } from 'react';

export type AppStateType = {
  chordsIndex: TChordsIndex;
};

export const AppState = createContext<AppStateType>({ chordsIndex: {} });

export const useAppStateContext = () => {
  const context = useContext(AppState);
  if (!context) {
    throw new Error('useAppStateContext must be used within an AppState.Provider');
  }
  return context;
};
