/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Song.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Handle song rendering based on url.
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import chordsIndexRaw from '@/configs/chords-index.json';
import type { TChordsIndex } from '@/configs/types/chord.types';
import type { TSong } from '@/configs/types/song.types';

import { Song as SongRenderer } from '@/components/SongRenderer/Song';

const songs = import.meta.glob<TSong>('/src/configs/songs/*.json');

export const Song = () => {
  const { id } = useParams();
  const chordsIndex = chordsIndexRaw.index as unknown as TChordsIndex;

  const [songConfig, setSongConfig] = useState<TSong | null>(null);

  useEffect(() => {
    if (!id) return;

    const path = `/src/configs/songs/${id}.json`;
    const loader = songs[path];

    if (!loader) {
      // TODO: Redirect to 404 song not found
      console.error(`Song ${id} not found`);
      return;
    }

    loader().then(module => setSongConfig(module));
  }, [id]);

  if (!songConfig) return <div>Loading song...</div>;

  return (
    <SongRenderer
      chordsIndex={chordsIndex}
      title={songConfig.title}
      artists={songConfig.artists}
      capo={songConfig.capo}
      songSegments={songConfig.songSegments}
      songSegmentsOrder={songConfig.songSegmentsOrder}
      resources={songConfig.resources}
    />
  );
};
