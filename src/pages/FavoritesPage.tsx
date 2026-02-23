/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2026                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file FavoritesPage.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description .
 */

import { SongsList } from '@/components/SongsList/SongsList';
import { useAppStore } from '@/store/index';

export const FavoritesPage = () => {
  const songFavorites = useAppStore(state => state.songFavorites);

  return <SongsList data={songFavorites} />;
};

export default FavoritesPage;
