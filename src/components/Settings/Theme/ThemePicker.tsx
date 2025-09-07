/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ThemePicker.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Display app themes and handles theme setting.
 */

import { useAppStateContext, useAppTheme } from '@/context/AppState';
import type { TAppTheme, TThemeIndexEntry } from '@/theme/types';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const ThemePicker = () => {
  const { settings: theme } = useAppTheme();
  const { setAppTheme } = useAppStateContext();

  const [themesIndex, setThemesIndex] = useState<TThemeIndexEntry[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}themes/index.json`)
      .then(response => response.json())
      .then(data => setThemesIndex(data.index as TThemeIndexEntry[]))
      .catch(error => {
        console.error('Failed to fetch Themes index:', error);
      });
  }, []);

  const setAppThemeValue = (directory: string) => {
    fetch(`${import.meta.env.BASE_URL}themes/${directory}/config.json`)
      .then(response => response.json())
      .then(data => setAppTheme !== undefined && setAppTheme(data as TAppTheme))
      .catch(error => {
        console.error(`Failed to fetch theme data of file ${directory}`, error);
      });
  };

  return (
    <Flex
      direction='column'
      justifyContent='center'
      padding={['1em 0em', '1.25em 0em']}
      borderRadius='10px'
      // [*] theme colors
      backgroundColor={theme.themePicker.background}
    >
      <Heading
        as='h1'
        size={['md', 'lg', 'xl']}
        mb='0.5em'
        textAlign='center'
        // [*] theme colors
        color={theme.themePicker.title}
      >
        Theme
      </Heading>

      <Flex direction='column'>
        {themesIndex.map((themeEntry, index) => (
          <Flex
            key={index}
            alignItems='center'
            gap='10px'
            padding={['0.8em 0.5em']}
            borderStyle='solid'
            borderWidth='thin'
            cursor='pointer'
            onClick={() => setAppThemeValue(themeEntry.directory)}
            // [*] theme colors
            backgroundColor={theme.themePicker.item.background}
            borderColor={theme.themePicker.item.border}
            _hover={{ backgroundColor: theme.themePicker.item.hoverBackground }}
          >
            <Box
              width='35px'
              textAlign='right'
              fontWeight='bold'
              // [*] theme colors
              color={theme.themePicker.item.indexColor}
            >
              {index + 1}.
            </Box>
            <Box
              width={['35px', '50px']}
              height={['35px', '50px']}
              backgroundColor={themeEntry.mainColor}
              borderRadius='10px'
              borderStyle='solid'
              borderWidth='thin'
              // [*] theme colors
              borderColor={theme.themePicker.item.colorBoxBorder}
            />
            <Heading
              as='h5'
              size={['sm', 'md']}
              // [*] theme colors
              color={theme.themePicker.item.title}
            >
              {themeEntry.title}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
