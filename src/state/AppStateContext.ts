/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppStateContext.tsx
 * @author Alexandru Delegeanu
 * @version 0.10
 * @description App state context.
 */

import { DefaultAppState, type TAppState } from '@/state/default';
import { createContext } from 'react';

export const AppStateContext = createContext<TAppState>(DefaultAppState);
