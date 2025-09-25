/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file useSessionStorage.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Session storage hook.
 */

import { useState } from 'react';

export const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const getStoredValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (err) {
      console.error('Error trying to write to session storage', err);
    }
  };

  return [storedValue, setValue];
};
