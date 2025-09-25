/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file useAppState.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description .
 */

import { AppStateContext } from '@/state/AppStateContext';
import { useContext } from 'react';

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppStateContext must be used within an AppState.Provider');
  }
  return context;
};
