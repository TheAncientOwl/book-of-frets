/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongSections.tsx
 * @author Alexandru Delegeanu
 * @version 0.19
 * @description Render song sections data.
 */

import type {
  TSongSection,
  TSongSectionLyrics,
  TStrummingPattern,
} from '@/common/types/song.types';
import { Accordion, AccordionButton, AccordionIcon, AccordionPanel } from '@/ui/Accordion';
import { SongSectionBody, SongSectionHeading } from '@/components/Song/Sections/SongSection';
import { useAppStore } from '@/store/index';

type TSongSectionsProps = {
  sections: Record<string, TSongSection>;
  order: string[];
  strumms: TStrummingPattern[];
  showLyrics: boolean;
  lyrics: TSongSectionLyrics[];
};

export const SongSections = (props: TSongSectionsProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <>
      {props.order.map((songSectionName, index) => {
        const songSectionData = props.sections[songSectionName];
        console.assert(
          songSectionData !== undefined,
          `Failed to find song section data for "${songSectionName}"`
        );

        return (
          <Accordion defaultOpen key={`${songSectionName}-${index}`}>
            <AccordionButton
              boxProps={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                // [*] theme colors
                borderColor: theme.chunks.divider,
              }}
            >
              <SongSectionHeading
                {...songSectionData}
                strumms={props.strumms}
                showLyrics={props.showLyrics}
                lyrics={props.lyrics[index]}
              />
              <AccordionIcon
                boxProps={{
                  position: 'absolute',
                  right: '10px',
                }}
                // [*] theme colors
                color={theme.chunks.item.title}
              />
            </AccordionButton>
            <AccordionPanel>
              <SongSectionBody
                {...songSectionData}
                strumms={props.strumms}
                showLyrics={props.showLyrics}
                lyrics={props.lyrics[index]}
              />
            </AccordionPanel>
          </Accordion>
        );
      })}
    </>
  );
};
