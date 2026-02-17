/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FetchLyricsButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.3
 * @description Fetch song lyrics button.
 */

import { useAppStore } from '@/store/index';
import { IconButton } from '@chakra-ui/react';
import { MdLyrics } from 'react-icons/md';

type TFetchLyricsButton = {
  available: boolean;
  lyricsShown: boolean;
  onClick: () => void;
};

export const FetchLyricsButton = (props: TFetchLyricsButton) => {
  const theme = useAppStore(state => state.appTheme.song.buttons);

  return (
    <>
      {props.available && (
        <IconButton
          variant='outline'
          aria-label='show-lyrics-button'
          icon={<MdLyrics color={props.lyricsShown ? theme.lyrics.bgHide : theme.lyrics.bgShow} />}
          display='flex'
          gap='3px'
          justifyContent='center'
          alignItems='center'
          size='sm'
          onClick={props.onClick}
          // [*] theme colors
          colorScheme={props.lyricsShown ? theme.lyrics.bgHide : theme.lyrics.bgShow}
          color={theme.lyrics.text}
          borderColor={props.lyricsShown ? theme.lyrics.bgHide : theme.lyrics.bgShow}
          _hover={{
            backgroundColor: 'black',
          }}
        />
      )}
    </>
  );
};
