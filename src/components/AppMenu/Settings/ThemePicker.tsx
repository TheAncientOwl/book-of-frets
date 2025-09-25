/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ThemePicker.tsx
 * @author Alexandru Delegeanu
 * @version 0.8
 * @description Display app themes and handles theme setting.
 */

import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import DefaultAppTheme from '@/state/theme/default.json';
import type { TAppTheme, TThemeIndexEntry } from '@/state/theme/types';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const ThemePicker = () => {
  const { appMenu } = useAppTheme();
  const theme = appMenu.items.settings.themePicker;

  const { setAppTheme, setAppLogoURL } = useAppState();

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
      .then(data => {
        if (setAppTheme !== undefined && setAppLogoURL !== undefined) {
          setAppTheme({ ...DefaultAppTheme, ...(data as TAppTheme) });
          setAppLogoURL(`${import.meta.env.BASE_URL}themes/${directory}/logo.svg`);
        }
      })
      .catch(error => {
        console.error(`Failed to fetch theme data of file ${directory}`, error);
      });
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
