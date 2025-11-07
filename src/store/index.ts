/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file index.ts
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Zustand global app store.
 */

import type { TChordsIndex } from '@/common/types/chord.types';
import { fetchArchivedJSON } from '@/common/utils/fetchArchivedJSON';
import { LocalStorageKeys } from '@/store/common/storageKeys';
import DefaultAppTheme from '@/store/theme/default.min.json';
import type { TAppTheme } from '@/store/theme/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

type TAppStore = {
  chordsIndex: TChordsIndex;
  appTheme: TAppTheme;
  appLogoURL: string;
  songSettings: {
    display: {
      segmentTimes: boolean;
      chordTimes: boolean;
      chordTimesOne: boolean;
      strummingPattern: boolean;
    };
  };
  updateChordsIndex: () => Promise<void>;
  setAppTheme: (theme: TAppTheme) => void;
  setAppLogoURL: (url: string) => void;
  setDisplaySegmentTimes: (value: boolean) => void;
  setDisplayChordTimes: (value: boolean) => void;
  setDisplayChordTimesOne: (value: boolean) => void;
  setDisplayStrummingPattern: (value: boolean) => void;
};

export const useAppStore = create<TAppStore, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      chordsIndex: {},
      appTheme: DefaultAppTheme,
      appLogoURL: `${import.meta.env.BASE_URL}logo.svg`,
      songSettings: {
        display: {
          segmentTimes: true,
          chordTimes: true,
          chordTimesOne: true,
          strummingPattern: true,
        },
      },

      updateChordsIndex: async () => {
        try {
          await fetchArchivedJSON(
            `${import.meta.env.BASE_URL}chords/index.min.json.gz.bin`,
            `${import.meta.env.BASE_URL}chords/index.min.json`,
            json => set({ chordsIndex: (json as { index: TChordsIndex }).index }),
            error => {
              console.error(error);
              set({ chordsIndex: {} });
            }
          );
        } catch (error) {
          console.error(error);
          set({ chordsIndex: {} });
        }
      },

      setAppTheme: theme => set({ appTheme: theme }),
      setAppLogoURL: url => set({ appLogoURL: url }),
      setDisplaySegmentTimes: value =>
        set(state => ({
          songSettings: {
            ...state.songSettings,
            display: { ...state.songSettings.display, segmentTimes: value },
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
    }),
    {
      name: LocalStorageKeys.appStorage,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useShallowAppStore = <T>(cb: (state: TAppStore) => T) => useAppStore(useShallow(cb));
