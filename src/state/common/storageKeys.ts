/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file storageKeys.ts
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description House of all local/session storage keys.
 */

export const LocalStorageKeys = {
  appTheme: 'app-theme',
  appLogoURL: 'app-logo-url',
  displayChordTimes: 'song-options-display-chord-times',
  displayChordTimesOne: 'song-options-display-chord-times-one',
  displayTimes: 'song-options-display-times',
  displayStrummingPattern: 'song-options-display-strumming-pattern',
  songsHistory: 'songs-history',
  tunerThreshold: 'tuner-threshold',
  chordsIndex: 'chords-index',
};

export const SessionStorageKeys = {
  patchedAppTheme: 'patched-app-theme',
  menuActiveTab: 'menu-active-tab',
};
