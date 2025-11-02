/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.18
 * @description Handle song rendering based on url.
 */

import type { TSong } from '@/common/types/song.types';
import { Song as SongRenderer } from '@/components/SongRenderer/Song';
import { addSongHistoryEntry } from '@/state/common/addSongHistoryEntry';
import type { TSongHistoryEntry } from '@/state/default';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { setDocumentThemeColor } from '@/state/theme/utils/setDocumentThemeColor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gunzipSync, strFromU8 } from 'fflate';

export const SongPage = () => {
  const { directory } = useParams();
  const { song: theme } = useAppTheme();
  const { songsHistory } = useAppState();

  const [songConfig, setSongConfig] = useState<{ data: TSong; directory: string } | null>(null);

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!directory) return;
    (async () => {
      try {
        const url = `${import.meta.env.BASE_URL}songs/${directory}/config.min.json.gz`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('not found');

        // Check if the server already sent Content-Encoding: gzip
        const encoding = response.headers.get('content-encoding');
        let jsonText: string;

        if (encoding === 'gzip') {
          // Already decompressed by browser
          jsonText = await response.text();
        } else {
          // Still compressed — manually gunzip
          const arrayBuffer = await response.arrayBuffer();
          const decompressed = gunzipSync(new Uint8Array(arrayBuffer));
          jsonText = strFromU8(decompressed);
        }

        const json = JSON.parse(jsonText);
        setSongConfig({ data: json, directory });
      } catch (err) {
        console.error(err);
        // fallback to plain JSON if .gz missing or invalid
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}songs/${directory}/config.min.json`);
          if (!res.ok) throw new Error('not found');
          const json = await res.json();
          setSongConfig({ data: json, directory });
        } catch (fallbackErr) {
          console.error(fallbackErr);
          navigate('/404');
        }
      }
    })();
  }, [directory, navigate]);

  useEffect(() => {
    if (!songConfig) return;

    songsHistory.set?.(
      addSongHistoryEntry(
        {
          title: songConfig.data.title,
          artists: songConfig.data.artists,
          directory: songConfig.directory,
        } as TSongHistoryEntry,
        songsHistory.value
      )
    );
  }, [songConfig, songsHistory]);

  if (!songConfig) return <div>Loading song...</div>;

  return <SongRenderer directory={songConfig.directory} {...songConfig.data} />;
};

export default SongPage;
