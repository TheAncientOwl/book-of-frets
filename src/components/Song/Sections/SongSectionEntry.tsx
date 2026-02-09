/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongSectionEntry.tsx
 * @author Alexandru Delegeanu
 * @version 2.1
 * @description Chords renderer.
 */

import type {
  TChordsV1SectionEntry,
  TChordsV2SectionData,
  TGTabV1SectionData,
  TSongSectionEntry,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { ChordsV1Renderer } from '@/components/Song/Sections/Renderers/Chords/v1';
import { ChordsV2Renderer } from '@/components/Song/Sections/Renderers/Chords/v2/index';
import { GuitarTabsV1Renderer } from '@/components/Song/Sections/Renderers/GuitarTabs/v1';
import { Box, Flex, Tooltip } from '@chakra-ui/react';

type TChordsProps = {
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics;
  entry: TSongSectionEntry;
};

const SongSectionEntryImpl = (props: TChordsProps) => {
  switch (props.entry.renderer) {
    case 'chords-v1':
      return (
        <ChordsV1Renderer
          data={props.entry.data as TChordsV1SectionEntry[]}
          strumms={props.strumms}
          showLyrics={props.showLyrics}
          lyrics={props.lyrics}
        />
      );
    case 'chords-v2':
      return (
        <ChordsV2Renderer
          data={props.entry.data as TChordsV2SectionData}
          strummingPatterns={props.strumms}
          showLyrics={props.showLyrics}
          lyrics={props.lyrics}
        />
      );
    case 'gtab-v1':
      return (
        <>
          <GuitarTabsV1Renderer data={props.entry.data as TGTabV1SectionData} />
        </>
      );

    default:
      console.error(`Unimplemented chords type "${props.entry.renderer}`);
      return (
        <Box
          color='red'
          backgroundColor='black'
          padding='0.25em 0.5em'
          borderRadius='5px'
          cursor='help'
        >
          <Tooltip
            label={
              <Box as='pre' whiteSpace='pre-wrap' fontSize='xs' maxW='600px'>
                {JSON.stringify(props.entry, null, 2)}
              </Box>
            }
          >
            {`[Configuration-Error] Unimplemented renderer type "${props.entry.renderer}"`}
          </Tooltip>
        </Box>
      );
  }
};

export const SongSectionEntry = (props: TChordsProps) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      gap='1em'
      padding={['1.1em 0em', '1.1em 1em']}
      overflowX={['auto', 'hidden']}
    >
      <SongSectionEntryImpl {...props} />
    </Flex>
  );
};
