/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file types.ts
 * @author Alexandru Delegeanu
 * @version 0.9
 * @description App theme types
 */

export type TAppMenuTheme = {
  menuButton: {
    background: string;
    hover: string;
    border: string;
    text: string;
  };
  closeButton: {
    color: string;
  };
  drawer: {
    background: string;
    appText: string;
    routeLink: string;
  };
  copyright: {
    color: string;
    hoverColor: string;
  };
};

export type TChordTheme = {
  border: string;
  background: string;
  dividers: string;
  title: string;
};

export type TFretTheme = {
  background: string;
  dividers: string;
  muted: {
    background: string;
    border: string;
    color: string;
  };
  finger: {
    background: string;
    border: string;
    color: string;
  };
};

export type TSongCardTheme = {
  background: string;
  border: string;
  hover: {
    background: string;
  };
  cover: {
    border: string;
    hover: {
      background: string;
      play: {
        background: string;
        text: string;
      };
    };
  };
  text: {
    number: string;
    title: string;
    authors: string;
    typeTags: string;
  };
  chords: {
    pick: string;
    popover: {
      background: string;
      border: string;
      arrow: string;
      tag: {
        background: string;
        border: string;
        text: string;
      };
    };
  };
};

export type TSongTheme = {
  background: string;
  header: {
    title: string;
    artists: string;
    typeTags: string;
    coverBorder: string;
    contributors: {
      heading: string;
      content: string;
      border: string;
      title: string;
      contributor: string;
    };
  };
  capo: {
    background: string;
    border: string;
    text: string;
  };
  chunks: {
    background: string;
    divider: string;
    item: {
      title: string;
      times: {
        background: string;
        color: string;
      };
      chordsPattern: {
        background: string;
        color: string;
        divider: string;
        times: string;
        chord: {
          background: string;
          color: string;
          segment: {
            popover: {
              background: string;
              arrow: string;
              border: string;
              closeButton: string;
            };
            times: string;
            pattern: string;
          };
          times: {
            background: string;
            color: string;
          };
        };
      };
      stringsPattern: {
        divider: string;
        stringNames: string;
        fret: {
          background: string;
          border: string;
          text: string;
        };
        filler: string;
      };
    };
  };
  resources: {
    title: string;
    item: {
      note: string;
      alias: string;
      author: string;
    };
  };
};

type TSearchBarTheme = {
  background: string;
  color: string;
  border: string;
  focusBorder: string;
};

export type TChordsIndexPageTheme = {
  background: string;
  searchBar: TSearchBarTheme;
};

export type TSongsIndexPageTheme = {
  background: string;
  searchBar: TSearchBarTheme;
};

export type TGeneralAppTheme = {
  background: string;
};

export type TAppSettingsTheme = {
  title: string;
  themePicker: {
    background: string;
    title: string;
    item: {
      background: string;
      border: string;
      hoverBackground: string;
      indexColor: string;
      colorBoxBorder: string;
      title: string;
    };
  };
};

export type TAppTheme = {
  name: string;
  appMenu: TAppMenuTheme;
  general: TGeneralAppTheme;
  chordsIndexPage: TChordsIndexPageTheme;
  chord: TChordTheme;
  fret: TFretTheme;
  songCard: TSongCardTheme;
  song: TSongTheme;
  songsIndexPage: TSongsIndexPageTheme;
  settings: TAppSettingsTheme;
};

export type TThemeIndexEntry = {
  title: string;
  directory: string;
  mainColor: string;
};
