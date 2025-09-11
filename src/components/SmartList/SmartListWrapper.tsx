/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SmartListWrapper.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Provide context for SmartList.
 */

import type { TSmartListContext, TSmartListContextData } from '@/components/SmartList/index';
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

export type TSmartListWrapperProps<T> = PropsWithChildren & {
  context: TSmartListContext<T>;
  setup: {
    data: T[];
    getKey: (val: T) => string;
    defaultSorted?: boolean;
    cmp?: (a: T, b: T) => number;
  };
};

export const SmartListWrapper = <T,>(props: TSmartListWrapperProps<T>) => {
  const [data, setData] = useState<T[]>([]);

  const resetData = useCallback(() => {
    setData(
      props.setup.defaultSorted ? [...props.setup.data].sort(props.setup.cmp) : props.setup.data
    );
  }, [props.setup.data, props.setup.cmp, props.setup.defaultSorted]);

  useEffect(() => {
    resetData();
  }, [resetData]);

  const contextValue = useMemo(
    (): TSmartListContextData<T> => ({
      originalData: props.setup.data,
      data,
      setData,
      resetData,
      getKey: props.setup.getKey,
    }),
    [props.setup.data, data, resetData, props.setup.getKey]
  );

  return <props.context.Context value={contextValue}>{props.children}</props.context.Context>;
};
