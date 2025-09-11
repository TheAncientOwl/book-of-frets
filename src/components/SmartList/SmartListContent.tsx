/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SmartListContent.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description TODO.
 */

import type { TSmartListContextUse } from '@/components/SmartList/index';
import type { BoxProps, ListProps, SimpleGridProps } from '@chakra-ui/react';
import { Fragment, type ComponentType, type ReactNode } from 'react';

export type TSmartListContentProps<T> = {
  useContext: TSmartListContextUse<T>;
  render: (item: T, index: number) => ReactNode;
  as?: ComponentType<{ children: ReactNode }>;
  asProps?: SimpleGridProps | ListProps | BoxProps;
};

export const SmartListContent = <T,>(props: TSmartListContentProps<T>) => {
  const { data } = props.useContext();
  const Wrapper = props.as ? props.as : Fragment;

  return (
    <Wrapper {...props.asProps}>{data.map((item, index) => props.render(item, index))}</Wrapper>
  );
};
