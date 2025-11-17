/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FetchLyricsButton.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Fetch song lyrics button.
 */

import { Box, Button } from '@chakra-ui/react';

type TFetchLyricsButton = {
  available: boolean;
  lyricsShown: boolean;
  onClick: () => void;
};

export const FetchLyricsButton = (props: TFetchLyricsButton) => {
  return (
    <>
      {props.available && (
        <Box display='flex' justifyContent='center' mb='1em'>
          <Button
            size='sm'
            onClick={props.onClick}
            // [*] theme colors
            colorScheme={props.lyricsShown ? 'red' : 'purple'}
          >
            {props.lyricsShown ? 'Hide Lyrics' : 'Show Lyrics'}
          </Button>
        </Box>
      )}
    </>
  );
};
