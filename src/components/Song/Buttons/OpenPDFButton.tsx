/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file OpenPDFButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.2
 * @description Opens the PDF attached to current song.
 */

import { useAppStore } from '@/store/index';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FaFilePdf } from 'react-icons/fa';

type TOpenPDFButtonProps = {
  directory: string;
};

export const OpenPDFButton = ({ directory }: TOpenPDFButtonProps) => {
  const theme = useAppStore(state => state.appTheme.song);
  const themeId = useAppStore(state => state.appTheme.id);

  return (
    <Tooltip
      label='Open PDF'
      padding='0.25em 0.5em'
      borderRadius='0.5em'
      borderStyle='solid'
      borderWidth='thin'
      // [*] theme colors
      color={theme.buttons.pdf.text}
      backgroundColor={theme.background}
      borderColor={theme.buttons.pdf.text}
    >
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
    </Tooltip>
  );
};

export default OpenPDFButton;
