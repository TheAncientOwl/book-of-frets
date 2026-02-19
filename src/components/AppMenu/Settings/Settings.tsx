/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Settings.tsx
 * @author Alexandru Delegeanu
 * @version 1.2
 * @description App settings menu.
 */

import { SongOptions } from '@/components/AppMenu/Settings/SongOptions';
import { useAppStore } from '@/store/index';
import { setDocumentThemeColor } from '@/store/theme/utils/setDocumentThemeColor';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from '@chakra-ui/react';
import { lazy, useLayoutEffect, type PropsWithChildren } from 'react';

const Refresh = lazy(() => import('@/components/AppMenu/Settings/Refresh'));
const ThemePicker = lazy(() => import('@/components/AppMenu/Settings/ThemePicker'));

const SettingsAccordionItem = (props: PropsWithChildren & { title: string }) => {
  const theme = useAppStore(state => state.appTheme.appMenu);

  return (
    <AccordionItem borderStyle='none'>
      <AccordionButton justifyContent='center' mb='5px'>
        <Heading
          as='h4'
          size='md'
          textAlign='center'
          // [*] theme colors
          color={theme.items.settings.title}
        >
          {props.title}
        </Heading>

        <AccordionIcon
          // [*] theme colors
          color={theme.items.settings.title}
        />
      </AccordionButton>
      <AccordionPanel padding='0'>{props.children}</AccordionPanel>
    </AccordionItem>
  );
};

export const Settings = () => {
  const background = useAppStore(state => state.appTheme.general.background);

  useLayoutEffect(() => setDocumentThemeColor(background), [background]);

  return (
    <Accordion
      allowMultiple
      defaultIndex={[0, 1, 2]}
      display='flex'
      flexDirection='column'
      gap='1em'
    >
      <SettingsAccordionItem title='Song Options'>
        <SongOptions />
      </SettingsAccordionItem>

      <SettingsAccordionItem title='General'>
        <Refresh />
      </SettingsAccordionItem>

      <SettingsAccordionItem title='Theme'>
        <ThemePicker />
      </SettingsAccordionItem>
    </Accordion>
  );
};

export default Settings;
