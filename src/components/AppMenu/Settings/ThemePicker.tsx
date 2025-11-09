/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ThemePicker.tsx
 * @author Alexandru Delegeanu
 * @version 0.16
 * @description Display app themes and handles theme setting.
 */

import { fetchArchivedJSON } from '@/common/utils/fetchArchivedJSON';
import DefaultAppTheme from '@/store/theme/default.min.json';
import type { TAppTheme, TThemeIndexEntry } from '@/store/theme/types';
import { deepMerge } from '@/store/theme/utils/patchLocalStorageTheme';
import { useAppStore, useShallowAppStore } from '@/store/index';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const ThemePicker = () => {
  const theme = useAppStore(state => state.appTheme.appMenu.items.settings.themePicker);

  const { setAppTheme, setApplogoURL } = useShallowAppStore(state => ({
    setAppTheme: state.setAppTheme,
    setApplogoURL: state.setAppLogoURL,
  }));

  const [themesIndex, setThemesIndex] = useState<TThemeIndexEntry[]>([]);

  useEffect(() => {
    fetchArchivedJSON(
      `${import.meta.env.BASE_URL}themes/index.min.json.gz.bin`,
      `${import.meta.env.BASE_URL}themes/index.min.json`,
      `${import.meta.env.BASE_URL}themes/index.json`,
      json => setThemesIndex((json as { index: TThemeIndexEntry[] }).index),
      error => {
        console.error('Failed to fetch Themes index:', error);
      }
    );
  }, []);

  const setAppThemeValue = (directory: string) => {
    fetchArchivedJSON(
      `${import.meta.env.BASE_URL}themes/${directory}/config.min.json.gz.bin`,
      `${import.meta.env.BASE_URL}themes/${directory}/config.min.json`,
      `${import.meta.env.BASE_URL}themes/${directory}/config.json`,
      json => {
        setAppTheme(deepMerge(DefaultAppTheme, json as TAppTheme));
        setApplogoURL(`${import.meta.env.BASE_URL}themes/${directory}/logo.svg`);
      },
      error => {
        console.error(`Failed to fetch theme data of file ${directory}`, error);
      }
    );
  };

  return (
    <Flex
      direction='column'
      justifyContent='center'
      borderRadius='10px'
      // [*] theme colors
      backgroundColor={theme.background}
    >
      <Flex direction='column'>
        {themesIndex.map((themeEntry, index) => (
          <Flex
            key={index}
            alignItems='center'
            gap='10px'
            padding={['0.5em 0.1em']}
            borderStyle='solid'
            borderWidth='thin'
            cursor='pointer'
            onClick={() => setAppThemeValue(themeEntry.directory)}
            // [*] theme colors
            backgroundColor={theme.item.background}
            borderColor={theme.item.border}
            _hover={{ backgroundColor: theme.item.hoverBackground }}
          >
            <Box
              width='25px'
              textAlign='right'
              fontWeight='bold'
              // [*] theme colors
              color={theme.item.indexColor}
            >
              {index + 1}.
            </Box>
            <Box
              width={['30px', '35px']}
              height={['30px', '35px']}
              backgroundColor={themeEntry.mainColor}
              borderRadius='10px'
              borderStyle='solid'
              borderWidth='thin'
              padding={['5px']}
              // [*] theme colors
              borderColor={theme.item.colorBoxBorder}
            >
              <Image
                src={`${import.meta.env.BASE_URL}themes/${themeEntry.directory}/logo.svg`}
                alt={`Book of Frets theme logo`}
                width='100%'
                height='100%'
                objectFit='cover'
              />
            </Box>
            <Heading
              as='h5'
              size='sm'
              // [*] theme colors
              color={theme.item.title}
            >
              {themeEntry.title}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ThemePicker;
