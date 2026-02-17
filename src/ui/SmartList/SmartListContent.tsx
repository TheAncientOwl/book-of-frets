/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SmartListContent.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Render filtered, virtualized items of the SmartList.
 */

import { useSessionStorage } from '@/common/hooks/useSessionStorage';
import { SessionStorageKeys } from '@/store/common/storageKeys';
import type { TSmartListContextUse } from '@/ui/SmartList/SmartList';
import { Box, type BoxProps, type ListProps, type SimpleGridProps } from '@chakra-ui/react';
import {
  Fragment,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';

const AutoSizer = lazy(() => import('react-virtualized').then(mod => ({ default: mod.AutoSizer })));
const List = lazy(() => import('react-virtualized').then(mod => ({ default: mod.List })));

export type TSmartListContentProps<T> = {
  useContext: TSmartListContextUse<T>;
  render: (item: T, index: number) => ReactNode;
  as?: ComponentType<{ children: ReactNode }>;
  asProps?: SimpleGridProps | ListProps | BoxProps;
  virtualized?: boolean;
  virtualizedOverscanRowCount?: number;
  virtualizedFallback?: ReactNode;
};

export const SmartListContent = <T,>(props: TSmartListContentProps<T>) => {
  const [scrollTop, setScrollTop] = useSessionStorage(SessionStorageKeys.listScrollTop, 0);

  const { data } = props.useContext();
  const Wrapper = props.as ? props.as : Fragment;

  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstRowRef.current) {
      setRowHeight(firstRowRef.current.getBoundingClientRect().height);
    }
  }, [data]);

  if (props.virtualized) {
    if (!rowHeight) {
      // Render just the first item offscreen to measure its height
      return (
        <Box ref={firstRowRef} style={{ position: 'absolute', visibility: 'hidden' }}>
          {data[0] !== undefined && props.render(data[0], 0)}
        </Box>
      );
    }

    return (
      <Suspense fallback={props.virtualizedFallback}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              scrollTop={scrollTop}
              onScroll={({ scrollTop }: { scrollTop: number }) => setScrollTop(scrollTop)}
              overscanRowCount={props.virtualizedOverscanRowCount}
              height={height}
              width={width}
              rowCount={data.length}
              rowHeight={rowHeight}
              rowRenderer={({
                index,
                key,
                style,
              }: {
                index: number;
                key: string;
                style: React.CSSProperties;
              }) => (
                <Box aria-label={`item-${index}`} key={key} style={style}>
                  {props.render(data[index], index)}
                </Box>
              )}
            />
          )}
        </AutoSizer>
      </Suspense>
    );
  }

  return (
    <Wrapper {...props.asProps}>{data.map((item, index) => props.render(item, index))}</Wrapper>
  );
};
