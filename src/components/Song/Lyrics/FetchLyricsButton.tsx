/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FetchLyricsButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Fetch song lyrics button.
 */

import { useAppStore } from '@/store/index';
import { Box, Button } from '@chakra-ui/react';

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
        <Box display='flex' justifyContent='center' mb='1em'>
          <Button
            size='sm'
            onClick={props.onClick}
            // [*] theme colors
            colorScheme={props.lyricsShown ? theme.lyrics.bgHide : theme.lyrics.bgShow}
            color={theme.lyrics.text}
          >
            {props.lyricsShown ? 'Hide Lyrics' : 'Show Lyrics'}
          </Button>
        </Box>
      )}
    </>
  );
};
