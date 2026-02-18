/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FetchLyricsButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.5
 * @description Fetch song lyrics button.
 */

import { useAppStore } from '@/store/index';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { MdLyrics } from 'react-icons/md';

type TFetchLyricsButton = {
  available: boolean;
  lyricsShown: boolean;
  onClick: () => void;
};

export const FetchLyricsButton = (props: TFetchLyricsButton) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <>
      {props.available && (
        <Tooltip
          label={props.lyricsShown ? 'Hide Lyrics' : 'Show Lyrics'}
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
            variant='outline'
            aria-label='show-lyrics-button'
            icon={
              <MdLyrics
                color={
                  props.lyricsShown ? theme.buttons.lyrics.bgHide : theme.buttons.lyrics.bgShow
                }
              />
            }
            display='flex'
            gap='3px'
            justifyContent='center'
            alignItems='center'
            size='sm'
            onClick={props.onClick}
            // [*] theme colors
            colorScheme={
              props.lyricsShown ? theme.buttons.lyrics.bgHide : theme.buttons.lyrics.bgShow
            }
            color={theme.buttons.lyrics.text}
            borderColor={
              props.lyricsShown ? theme.buttons.lyrics.bgHide : theme.buttons.lyrics.bgShow
            }
            _hover={{
              backgroundColor: 'black',
            }}
          />
        </Tooltip>
      )}
    </>
  );
};
