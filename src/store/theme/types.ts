/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file types.ts
 * @author Alexandru Delegeanu
 * @version 1.2
 * @description App theme types
 */

type THomePageTheme = {
  title: string;
  link: string;
  paragraph: string;
  heading: string;
  listItem: string;
};

type TAppMenuTheme = {
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
  };
  copyright: {
    color: string;
    hoverColor: string;
  };
  tabs: {
    title: {
      color: string;
      border: string;
      selected: {
        color: string;
        border: string;
      };
    };
  };
  items: {
    navigation: {
      routeLink: string;
    };
    settings: {
      title: string;
      songOption: {
        color: string;
        icon: {
          border: string;
          color: string;
          background: string;
          checked: {
            background: string;
            border: string;
          };
        };
      };
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
    tuner: {
      divider: string;
      controlButton: {
        background: string;
        color: string;
        hover: {
          background: string;
          color: string;
        };
      };
      frequencyDisplay: {
        color: string;
      };
      frequencyProgressIndicator: {
        matched: {
          background: string;
          border: string;
          color: string;
        };
        tuneUp: {
          background: string;
          border: string;
          color: string;
        };
        tuneDown: {
          background: string;
          border: string;
          color: string;
        };
      };
      strings: {
        active: {
          noteColor: string;
          noteBorderColor: string;
          stringColor: string;
          backgroundColor: string;
        };
        inactive: {
          noteColor: string;
          noteBorderColor: string;
          stringColor: string;
          backgroundColor: string;
        };
      };
      thresholdSlider: {
        color: string;
        slider: {
          track: string;
          filler: string;
          thumb: string;
          tooltip: {
            background: string;
            color: string;
          };
        };
      };
    };
  };
};

type TChordTheme = {
  border: string;
  background: string;
  dividers: string;
  title: string;
};

type TFretTheme = {
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

type TSongCardTheme = {
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
  buttons: {
    lyrics: {
      text: string;
      bgShow: string;
      bgHide: string;
    };
    pdf: {
      text: string;
      bg: string;
    };
  };
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
  items: {
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
          section: {
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
        chordBackground: string;
      };
    };
  };
  notes: {
    title: string;
    note: string;
  };
  res: {
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

type TChordsIndexPageTheme = {
  background: string;
  searchBar: TSearchBarTheme;
};

type TSongsIndexPageTheme = {
  background: string;
  searchBar: TSearchBarTheme;
};

type TGeneralAppTheme = {
  background: string;
};

type TScrollbarTheme = {
  track: string;
  thumb: string;
};

export type TAppTheme = {
  id: string;
  name: string;
  homePage: THomePageTheme;
  appMenu: TAppMenuTheme;
  general: TGeneralAppTheme;
  chordsIndexPage: TChordsIndexPageTheme;
  chord: TChordTheme;
  fret: TFretTheme;
  songCard: TSongCardTheme;
  song: TSongTheme;
  songsIndexPage: TSongsIndexPageTheme;
  scrollbar: TScrollbarTheme;
};

export type TThemeIndexEntry = {
  title: string;
  directory: string;
  mainColor: string;
};
