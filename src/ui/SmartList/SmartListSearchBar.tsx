/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SmartListSearchBar.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Filter items of SmartList.
 */

import type { TSmartListContextUse } from '@/ui/SmartList/index';
import { Icon, Input, InputGroup, InputRightElement, type InputProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export type TSmartListSearchBarProps<T> = InputProps & {
  useContext: TSmartListContextUse<T>;
};

export const SmartListSearchBar = <T,>(props: TSmartListSearchBarProps<T>) => {
  const [search, setSearch] = useState<string>('');

  const { useContext, ...inputProps } = props;
  const { originalData, setData, resetData, getKey } = useContext();

  useEffect(() => {
    if (!search) {
      resetData();
      return;
    }

    const filtered = originalData.filter(item =>
      getKey(item).toLowerCase().includes(search.toLowerCase())
    );
    setData(filtered);
  }, [search, getKey, setData, resetData, originalData]);

  return (
    <InputGroup color={inputProps?.color}>
      <Input
        {...inputProps}
        aria-label='Search items'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <InputRightElement>
        <Icon as={FaSearch} />
      </InputRightElement>
    </InputGroup>
  );
};
