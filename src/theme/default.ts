/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file default.ts
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Default app theme
 */

import type {
  TAppMenuTheme,
  TAppSettingsTheme,
  TAppTheme,
  TChordTheme,
  TFretTheme,
  TGeneralAppTheme,
  TSongCardTheme,
  TSongsIndexPageTheme,
  TSongTheme,
} from '@/theme/types';

const DefaultAppMenuTheme: TAppMenuTheme = {
  menuButton: {
    background: '#2B8C44',
    hover: 'green.600',
    border: 'green.500',
    text: 'white',
  },
  closeButton: {
    color: 'white',
  },
  drawer: {
    background: '#2B8C44',
    appText: 'white',
    routeLink: 'white',
  },
  copyright: {
    color: 'white',
    hoverColor: 'green.100',
  },
};

const DefaultGeneralAppTheme: TGeneralAppTheme = {
  background: 'gray.900',
};

const DefaultChordTheme: TChordTheme = {
  background: '#2B8C44',
  dividers: 'white',
  title: 'white',
};

const DefaultFretTheme: TFretTheme = {
  background: 'blackAlpha.300',
  dividers: 'white',
  muted: {
    background: 'red.500',
    border: 'red.600',
    color: 'white',
  },
  finger: {
    background: 'green.500',
    border: 'green.600',
    color: 'white',
  },
};

const DefaultSongCardTheme: TSongCardTheme = {
  background: 'blackAlpha.400',
  border: 'green.600',
  hover: {
    background: 'blackAlpha.500',
  },
  cover: {
    border: 'green.500',
    hover: {
      background: 'rgba(0,0,0,0.6)',
      play: {
        background: 'green.600',
        text: 'white',
      },
    },
  },
  text: {
    number: 'white',
    title: 'white',
    authors: 'white',
    typeTags: 'white',
  },
  chords: {
    pick: 'white',
    popover: {
      border: 'white',
      background: 'gray.900',
      arrow: 'white',
      tag: {
        background: 'green.600',
        border: 'green.400',
        text: 'white',
      },
    },
  },
};

const DefaultSongTheme: TSongTheme = {
  background: '#2B8C44',
  header: {
    title: 'white',
    artists: 'white',
    typeTags: 'white',
    coverBorder: 'green.500',
  },
  capo: {
    background: 'green.600',
    border: 'green.500',
    text: 'white',
  },
  segments: {
    background: 'blackAlpha.400',
    item: {
      title: 'white',
      times: {
        background: 'green.600',
        color: 'white',
      },
      chordsPattern: {
        background: 'green.600',
        color: 'white',
        divider: 'white',
        times: 'white',
        chord: {
          background: 'green.600',
          color: 'white',
          segment: {
            popover: {
              background: 'gray.900',
              arrow: 'white',
              border: 'white',
              closeButton: 'white',
            },
            times: 'white',
            pattern: 'white',
          },
          times: {
            background: 'green.500',
            color: 'white',
          },
        },
      },
      stringsPattern: {
        divider: 'white',
        stringNames: 'white',
        fret: {
          background: 'green.600',
          border: 'green.900',
          text: 'white',
        },
        filler: 'white',
      },
    },
  },
  resources: {
    title: 'white',
    item: {
      note: 'white',
      alias: 'white',
      author: 'white',
    },
  },
};

const DefaultSongsIndexPageTheme: TSongsIndexPageTheme = {
  background: '#2B8C44',
};

const DefaultSettingsTheme: TAppSettingsTheme = {
  themePicker: {
    background: '#2B8C44',
    title: '',
    item: {
      background: 'blackAlpha.400',
      hoverBackground: 'blackAlpha.500',
      border: 'green.800',
      indexColor: 'white',
      colorBoxBorder: 'gray.900',
      title: 'white',
    },
  },
};

export const DefaultAppTheme: TAppTheme = {
  name: 'BookOfFrets ~ Nature',
  appMenu: DefaultAppMenuTheme,
  general: DefaultGeneralAppTheme,
  chord: DefaultChordTheme,
  fret: DefaultFretTheme,
  songCard: DefaultSongCardTheme,
  song: DefaultSongTheme,
  songsIndexPage: DefaultSongsIndexPageTheme,
  settings: DefaultSettingsTheme,
};
