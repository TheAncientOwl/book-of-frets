/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.22
 * @description Handle song rendering based on url.
 */

import type { TSong } from '@/common/types/song.types';
import { fetchArchivedJSON } from '@/common/utils/fetchArchivedJSON';
import { SkeletonSong as SkeletonSongRenderer } from '@/components/SongRenderer/SkeletonSong';
import { Song as SongRenderer } from '@/components/SongRenderer/Song';
import { useAppStore } from '@/store/index';
import { setDocumentThemeColor } from '@/store/theme/utils/setDocumentThemeColor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const SongPage = () => {
  const [songConfig, setSongConfig] = useState<{ data: TSong; directory: string } | null>(null);
  const { directory } = useParams();
  const pageBackground = useAppStore(state => state.appTheme.song.background);

  useLayoutEffect(() => setDocumentThemeColor(pageBackground), [pageBackground]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!directory) return;

    fetchArchivedJSON(
      `${import.meta.env.BASE_URL}songs/${directory}/config.min.json.gz.bin`,
      `${import.meta.env.BASE_URL}songs/${directory}/config.min.json`,
      `${import.meta.env.BASE_URL}songs/${directory}/config.json`,
      json => setSongConfig({ data: json as TSong, directory }),
      error => {
        console.error(error);
        navigate('/404');
      }
    );
  }, [directory, navigate]);

  if (!songConfig) return <SkeletonSongRenderer />;

  return <SongRenderer directory={songConfig.directory} {...songConfig.data} />;
};

export default SongPage;
