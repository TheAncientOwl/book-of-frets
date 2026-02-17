/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file OpenPDFButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Opens the PDF attached to current song.
 */

import { useAppStore } from '@/store/index';
import { IconButton } from '@chakra-ui/react';
import { FaFilePdf } from 'react-icons/fa';

type TOpenPDFButtonProps = {
  directory: string;
};

export const OpenPDFButton = ({ directory }: TOpenPDFButtonProps) => {
  const theme = useAppStore(state => state.appTheme.song);
  const themeId = useAppStore(state => state.appTheme.id);

  return (
    <IconButton
      aria-label='open-pdf-button'
      icon={<FaFilePdf color={theme.buttons.pdf.text} />}
      display='flex'
      gap='3px'
      justifyContent='center'
      alignItems='center'
      size='sm'
      onClick={() => {
        window.open(
          `${import.meta.env.BASE_URL}songs/${directory}/pdf/${directory}.${themeId}.pdf`,
          '_blank',
        );
      }}
      variant='outline'
      // [*] theme colors
      colorScheme={theme.buttons.pdf.bg}
      color={theme.buttons.pdf.text}
      borderColor={theme.buttons.pdf.bg}
      _hover={{
        backgroundColor: 'black',
      }}
    />
  );
};

export default OpenPDFButton;
