/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.10
 * @description Handle song rendering based on url.
 */

import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TSong } from '@/types/song.types';

import { Song as SongRenderer } from '@/components/SongRenderer/Song';
import { useAppTheme } from '@/context/AppState';
import { setDocumentThemeColor } from '@/theme/setDocumentThemeColor';

export const SongPage = () => {
  const { directory } = useParams();
  const { song: theme } = useAppTheme();

  const [songConfig, setSongConfig] = useState<TSong | null>(null);

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  useEffect(() => {
    if (!directory) return;

    fetch(`${import.meta.env.BASE_URL}songs/${directory}/config.json`)
      .then(response => {
        if (!response.ok) {
          // TODO: Redirect to 404 song not found
          console.error(`Song ${directory} not found`);
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (data) setSongConfig(data);
      });
  }, [directory]);

  if (!songConfig) return <div>Loading song...</div>;

  return (
    <SongRenderer
      directory={directory || ''}
      title={songConfig.title}
      artists={songConfig.artists}
      capo={songConfig.capo}
      songSegments={songConfig.songSegments}
      songSegmentsOrder={songConfig.songSegmentsOrder}
      resources={songConfig.resources}
      type={songConfig.type}
      contributors={songConfig.contributors}
      notes={songConfig.notes}
    />
  );
};

export default SongPage;
