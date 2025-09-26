/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file useAppTheme.ts
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description use app theme hook.
 */

import { AppStateContext } from '@/state/AppStateContext';
import { useContext } from 'react';

export const useAppTheme = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppState.Provider');
  }
  return context.appTheme.value;
};
