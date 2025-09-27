/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SmartListContent.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description Render filtered, virtualized items of the SmartList.
 */

import type { TSmartListContextUse } from '@/components/SmartList/index';
import { Box, type BoxProps, type ListProps, type SimpleGridProps } from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { AutoSizer, List } from 'react-virtualized';

export type TSmartListContentProps<T> = {
  useContext: TSmartListContextUse<T>;
  render: (item: T, index: number) => ReactNode;
  as?: ComponentType<{ children: ReactNode }>;
  asProps?: SimpleGridProps | ListProps | BoxProps;
  virtualized?: boolean;
};

export const SmartListContent = <T,>(props: TSmartListContentProps<T>) => {
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
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            rowCount={data.length}
            rowHeight={rowHeight}
            rowRenderer={({ index, key, style }) => (
              <Box aria-label={`item-${index}`} key={key} style={style}>
                {props.render(data[index], index)}
              </Box>
            )}
          />
        )}
      </AutoSizer>
    );
  }

  return (
    <Wrapper {...props.asProps}>{data.map((item, index) => props.render(item, index))}</Wrapper>
  );
};
