/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file main.tsx
 * @author Alexandru Delegeanu
 * @version 0.5
 * @description React entry point.
 */

import { App } from '@/App.tsx';
import { patchLocalStorageTheme } from '@/theme/patchLocalStorageTheme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';

patchLocalStorageTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
