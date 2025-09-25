/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Settings.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description App settings menu.
 */

import { SongOptions } from '@/components/AppMenu/Settings/SongOptions';
import { ThemePicker } from '@/components/AppMenu/Settings/ThemePicker';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { setDocumentThemeColor } from '@/state/theme/utils/setDocumentThemeColor';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from '@chakra-ui/react';
import { useLayoutEffect, type PropsWithChildren } from 'react';

const SettingsAccordionItem = (props: PropsWithChildren & { title: string }) => {
  const { appMenu: theme } = useAppTheme();

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
  const { general } = useAppTheme();

  useLayoutEffect(() => setDocumentThemeColor(general.background), [general.background]);

  return (
    <Accordion allowMultiple defaultIndex={[0, 1]} display='flex' flexDirection='column' gap='1em'>
      <SettingsAccordionItem title='Song Options'>
        <SongOptions />
      </SettingsAccordionItem>

      <SettingsAccordionItem title='Theme'>
        <ThemePicker />
      </SettingsAccordionItem>
    </Accordion>
  );
};

export default Settings;
