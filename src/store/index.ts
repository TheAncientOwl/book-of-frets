/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file index.ts
 * @author Alexandru Delegeanu
 * @version 1.2
 * @description Zustand global app store.
 */

import type { TChordsIndex } from '@/common/types/chord.types';
import type { TSongsIndexEntry } from '@/common/types/song.types';
import { fetchArchivedJSON } from '@/common/utils/fetchArchivedJSON';
import { LocalStorageKeys } from '@/store/common/storageKeys';
import DefaultAppTheme from '@/store/theme/default.min.json';
import type { TAppTheme } from '@/store/theme/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

type TAppStore = {
  chordsIndex: TChordsIndex;
  updateChordsIndex: () => Promise<void>;

  appTheme: TAppTheme;
  setAppTheme: (theme: TAppTheme) => void;

  appLogoURL: string;
  setAppLogoURL: (url: string) => void;

  songSettings: {
    display: {
      notes: boolean;
      resources: boolean;
      allChords: boolean;
      sectionTimes: boolean;
      chordTimes: boolean;
      chordTimesOne: boolean;
      strummingPattern: boolean;
      chordsFingers: boolean;
    };
  };
  setDisplaySectionTimes: (value: boolean) => void;
  setDisplayChordTimes: (value: boolean) => void;
  setDisplayChordTimesOne: (value: boolean) => void;
  setDisplayStrummingPattern: (value: boolean) => void;
  setDisplayChordsFingers: (value: boolean) => void;
  setDisplayAllChords: (value: boolean) => void;
  setDisplayResources: (value: boolean) => void;
  setDisplayNotes: (value: boolean) => void;

  songFavorites: TSongsIndexEntry[];
  isSongFavorite: (song: TSongsIndexEntry) => boolean;
  toggleSongFavorite: (song: TSongsIndexEntry) => void;
};

export const useAppStore = create<TAppStore, [['zustand/persist', unknown]]>(
  persist(
    (set, get) => ({
      chordsIndex: {},
      appTheme: DefaultAppTheme,
      appLogoURL: `${import.meta.env.BASE_URL}logo.svg`,
      songSettings: {
        display: {
          notes: true,
          resources: true,
          allChords: true,
          sectionTimes: true,
          chordTimes: true,
          chordTimesOne: true,
          strummingPattern: true,
          chordsFingers: true,
        },
      },
      songFavorites: [],

      updateChordsIndex: async () => {
        try {
          await fetchArchivedJSON(
            `${import.meta.env.BASE_URL}chords/index.min.json.gz.bin`,
            `${import.meta.env.BASE_URL}chords/index.min.json`,
            `${import.meta.env.BASE_URL}chords/index.json`,
            json => set({ chordsIndex: (json as { index: TChordsIndex }).index }),
            error => {
              console.error(error);
              set({ chordsIndex: {} });
            },
          );
        } catch (error) {
          console.error(error);
          set({ chordsIndex: {} });
        }
      },

      setAppTheme: theme => set({ appTheme: theme }),
      setAppLogoURL: url => set({ appLogoURL: url }),
      setDisplaySectionTimes: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: { ...state.songSettings.display, sectionTimes: value },
          },
        })),
      setDisplayChordTimes: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: { ...state.songSettings.display, chordTimes: value },
          },
        })),
      setDisplayChordTimesOne: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: { ...state.songSettings.display, chordTimesOne: value },
          },
        })),
      setDisplayStrummingPattern: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: { ...state.songSettings.display, strummingPattern: value },
          },
        })),
      setDisplayChordsFingers: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: { ...state.songSettings.display, chordsFingers: value },
          },
        })),
      setDisplayAllChords: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: {
              ...state.songSettings.display,
              allChords: value,
            },
          },
        })),
      setDisplayResources: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: {
              ...state.songSettings.display,
              resources: value,
            },
          },
        })),
      setDisplayNotes: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: {
              ...state.songSettings.display,
              notes: value,
            },
          },
        })),

      isSongFavorite: (song: TSongsIndexEntry) => {
        return get().songFavorites.some(fav => fav.directory === song.directory);
      },

      toggleSongFavorite: (song: TSongsIndexEntry) =>
        set(state => {
          const exists = state.songFavorites.some(fav => fav.directory === song.directory);

          return {
            songFavorites: exists
              ? state.songFavorites.filter(fav => fav.directory !== song.directory)
              : [song, ...state.songFavorites],
          };
        }),
    }),
    {
      name: LocalStorageKeys.appStorage,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useShallowAppStore = <T>(cb: (state: TAppStore) => T) => useAppStore(useShallow(cb));
