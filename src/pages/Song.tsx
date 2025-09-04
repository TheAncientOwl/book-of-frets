/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Handle song rendering based on url.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TSong } from '@/types/song.types';

import { Song as SongRenderer } from '@/components/SongRenderer/Song';

export const Song = () => {
  const { directory } = useParams();

  const [songConfig, setSongConfig] = useState<TSong | null>(null);

  useEffect(() => {
    if (!directory) return;

    fetch(`/songs/${directory}/config.json`)
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
      title={songConfig.title}
      artists={songConfig.artists}
      capo={songConfig.capo}
      songSegments={songConfig.songSegments}
      songSegmentsOrder={songConfig.songSegmentsOrder}
      resources={songConfig.resources}
    />
  );
};
