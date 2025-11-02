/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.17
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

export const SongPage = () => {
  const { directory } = useParams();
  const { song: theme } = useAppTheme();
  const { songsHistory } = useAppState();

  const [songConfig, setSongConfig] = useState<{ data: TSong; directory: string } | null>(null);

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!directory) return;

    fetch(`${import.meta.env.BASE_URL}songs/${directory}/config.min.json.gz`)
      .then(response => {
        if (!response.ok) {
          console.error(`Song ${directory} not found`);
          navigate('/404');
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setSongConfig({ data, directory: directory! });
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/404');
      });
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
