/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SettingsPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description App settings page.
 */

import { ThemePicker } from '@/components/Settings/Theme/ThemePicker';
import { useAppTheme } from '@/context/AppState';
import { Container, Heading } from '@chakra-ui/react';

export const SettingsPage = () => {
  const { settings: theme } = useAppTheme();

  return (
    <Container pt='3rem' color='white'>
      <Heading
        as='h1'
        mb='5rem'
        textAlign='center'
        // [*] theme colors
        color={theme.title}
      >
        Settings
      </Heading>

      <ThemePicker />
    </Container>
  );
};

export default SettingsPage;
