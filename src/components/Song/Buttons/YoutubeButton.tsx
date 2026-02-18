/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file YoutubeButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Open youtube link button.
 */

import { useAppStore } from '@/store/index';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';

type TYoutubeButtonProps = {
  title: React.ReactNode;
  link: string;
};

export const YoutubeButton = (props: TYoutubeButtonProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <Tooltip label={props.title} hasArrow>
      <IconButton
        aria-label='open-youtube-button'
        icon={<FaYoutube color={theme.buttons.pdf.text} />}
        display='flex'
        gap='3px'
        justifyContent='center'
        alignItems='center'
        size='sm'
        variant='outline'
        // [*] theme colors
        colorScheme={theme.buttons.pdf.bg}
        color={theme.buttons.pdf.text}
        borderColor={theme.buttons.pdf.bg}
        _hover={{
          backgroundColor: 'black',
        }}
        onClick={() => {
          if (props.link) {
            window.open(props.link, '_blank', 'noopener,noreferrer');
          }
        }}
      />
    </Tooltip>
  );
};

export default YoutubeButton;
