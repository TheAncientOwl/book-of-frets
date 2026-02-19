/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Song display options.
 */

import { useAppStore, useShallowAppStore } from '@/store/index';
import { Checkbox, VStack, type CheckboxProps } from '@chakra-ui/react';

const ThemedCheckbox = (props: CheckboxProps) => {
  const theme = useAppStore(state => state.appTheme.appMenu.items.settings.songOption);

  return (
    <Checkbox
      fontWeight='bold'
      {...props}
      // [*] theme colors
      color={theme.color}
      iconColor={theme.icon.color}
      sx={{
        '& .chakra-checkbox__control': {
          borderColor: theme.icon.border,
          backgroundColor: theme.icon.background,
          _checked: {
            backgroundColor: theme.icon.checked.background,
            borderColor: theme.icon.checked.border,
          },
        },
      }}
    />
  );
};

export const SongOptions = () => {
  const {
    display,
    setDisplaySectionTimes,
    setDisplayChordTimes,
    setDisplayChordTimesOne,
    setDisplayStrummingPattern,
    setDisplayChordsFingers,
    setDisplayAllChords,
    setDisplayResources,
    setDisplayNotes,
  } = useShallowAppStore(state => ({
    display: state.songSettings.display,
    setDisplaySectionTimes: state.setDisplaySectionTimes,
    setDisplayChordTimes: state.setDisplayChordTimes,
    setDisplayChordTimesOne: state.setDisplayChordTimesOne,
    setDisplayStrummingPattern: state.setDisplayStrummingPattern,
    setDisplayChordsFingers: state.setDisplayChordsFingers,
    setDisplayAllChords: state.setDisplayAllChords,
    setDisplayResources: state.setDisplayResources,
    setDisplayNotes: state.setDisplayNotes,
  }));

  return (
    <VStack align='start' spacing={3}>
      <ThemedCheckbox
        isChecked={display.allChords}
        onChange={() => setDisplayAllChords(!display.allChords)}
      >
        Song Chords List
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.chordsFingers}
        onChange={() => setDisplayChordsFingers(!display.chordsFingers)}
      >
        Chords Fingers
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.resources}
        onChange={() => setDisplayResources(!display.resources)}
      >
        Song Resources
      </ThemedCheckbox>
      <ThemedCheckbox isChecked={display.notes} onChange={() => setDisplayNotes(!display.notes)}>
        Song Notes
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.sectionTimes}
        onChange={() => setDisplaySectionTimes(!display.sectionTimes)}
      >
        Section Times
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.chordTimes}
        onChange={() => setDisplayChordTimes(!display.chordTimes)}
      >
        Chord Times
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.chordTimesOne}
        onChange={() => setDisplayChordTimesOne(!display.chordTimesOne)}
      >
        Chord Times 1
      </ThemedCheckbox>
      <ThemedCheckbox
        isChecked={display.strummingPattern}
        onChange={() => setDisplayStrummingPattern(!display.strummingPattern)}
      >
        Strumming Pattern
      </ThemedCheckbox>
    </VStack>
  );
};
