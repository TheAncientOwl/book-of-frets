/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordV2Display.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description .
 */

import { Box } from '@chakra-ui/react';

type TChordDisplayProps = {
  name: string;
};

export const ChordV2Display = (props: TChordDisplayProps) => {
  if (props.name.length == 1) {
    return props.name;
  }

  const chord = props.name[0];
  const mod = props.name.substring(1);

  return (
    <Box as='span'>
      {chord}
      <Box as='span' fontSize='0.8em'>
        {mod}
      </Box>
    </Box>
  );
};
