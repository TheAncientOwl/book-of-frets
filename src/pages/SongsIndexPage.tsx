/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongsIndexPage.tsx
 * @author Alexandru Delegeanu
 * @version 1.3
 * @description List all available songs.
 */

import type { TSongsIndexEntry } from '@/common/types/song.types';
import { fetchArchivedJSON } from '@/common/utils/fetchArchivedJSON';
import { SongsList } from '@/components/SongsList/SongsList';
import { useAppStore } from '@/store/index';
import { setDocumentThemeColor } from '@/store/theme/utils/setDocumentThemeColor';
import { useEffect, useLayoutEffect, useState } from 'react';

export const SongsIndexPage = () => {
  const theme = useAppStore(state => state.appTheme.songsIndexPage);

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  const [songsIndex, setSongsIndex] = useState<TSongsIndexEntry[]>([]);

  useEffect(() => {
    fetchArchivedJSON(
      `${import.meta.env.BASE_URL}songs/index.min.json.gz.bin`,
      `${import.meta.env.BASE_URL}songs/index.min.json`,
      `${import.meta.env.BASE_URL}songs/index.json`,
      json => {
        const fetchedIndex = (json as { index: TSongsIndexEntry[] }).index;

        if (import.meta.env.DEV) {
          setSongsIndex([
            ...fetchedIndex,
            {
              title: 'Proto',
              artists: ['Dunno'],
              directory: '_proto',
              type: ['acoustic', 'electric'],
              chordIDs: ['Em', 'Am', 'G', 'C', 'D'],
            },
          ]);
        } else {
          setSongsIndex([...fetchedIndex]);
        }
      },
      error => {
        console.error('Failed to fetch songs index:', error);
      },
    );
  }, []);

  return <SongsList data={songsIndex} />;
};

export default SongsIndexPage;
