/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file index.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description SmartList index file.
 */

import {
  SmartListContent,
  type TSmartListContentProps,
} from '@/components/SmartList/SmartListContent';
import {
  SmartListSearchBar,
  type TSmartListSearchBarProps,
} from '@/components/SmartList/SmartListSearchBar';
import {
  SmartListWrapper,
  type TSmartListWrapperProps,
} from '@/components/SmartList/SmartListWrapper';
import { createContext, useContext, type ComponentType } from 'react';

export type TSmartListContextData<T> = {
  originalData: T[];
  data: T[];
  getKey: (val: T) => string;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  resetData: () => void;
};

export type TSmartListContextUse<T> = () => TSmartListContextData<T>;

export type TSmartListContext<T> = {
  Context: React.Context<TSmartListContextData<T> | undefined>;
  use: TSmartListContextUse<T>;
};

const createSmartListContext = <T,>(): TSmartListContext<T> => {
  const SmartListContext = createContext<TSmartListContextData<T> | undefined>(undefined);

  const useSmartListContext = () => {
    const context = useContext(SmartListContext);
    if (!context)
      throw new Error('useSmartListContext must be used within a SmartListContext.Provider');
    return context;
  };

  return { Context: SmartListContext, use: useSmartListContext };
};

type TSmartListComponents<T> = {
  context: TSmartListContext<T>;
  Wrapper: ComponentType<TSmartListWrapperProps<T>>;
  Content: ComponentType<TSmartListContentProps<T>>;
  SearchBar: ComponentType<TSmartListSearchBarProps<T>>;
};

export const createSmartList = <T,>(): TSmartListComponents<T> => {
  return {
    context: createSmartListContext<T>(),
    Wrapper: SmartListWrapper<T>,
    Content: SmartListContent<T>,
    SearchBar: SmartListSearchBar<T>,
  };
};
