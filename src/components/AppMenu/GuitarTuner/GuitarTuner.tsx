/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file GuitarTuner.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Main tuner component.
 */

import { useState } from 'react';
import { FaPlay } from 'react-icons/fa6';

import { Box, IconButton } from '@chakra-ui/react';

import { usePitchDetector, type TNotesConfiguration } from '@/common/hooks/usePitchDetector';
import { FrequencyProgressIndicator } from '@/components/AppMenu/GuitarTuner/FrequencyProgressIndicator';
import { Strings, type TStringName } from '@/components/AppMenu/GuitarTuner/Strings';
import { FaStop } from 'react-icons/fa';

const StandardNotes: TNotesConfiguration = [
  { name: 'E2', freq: 82.41 },
  { name: 'A2', freq: 110.0 },
  { name: 'D3', freq: 146.83 },
  { name: 'G3', freq: 196.0 },
  { name: 'B3', freq: 246.94 },
  { name: 'E4', freq: 329.63 },
];

const StringToNoteIndex = {
  E: 0,
  A: 1,
  D: 2,
  G: 3,
  B: 4,
  e: 5,
};

export const GuitarTuner = () => {
  const pitchDetector = usePitchDetector(StandardNotes);

  const [activeString, setActiveString] = useState<TStringName | null>(null);

  const stopTuner = () => {
    pitchDetector.stopTuner();
    setActiveString(null);
  };

  return (
    <Box
      textAlign='center'
      // [*] theme colors
      color='white'
    >
      <IconButton
        aria-label='play-pause tuner'
        icon={pitchDetector.isRunning ? <FaStop /> : <FaPlay />}
        onClick={pitchDetector.isRunning ? stopTuner : pitchDetector.startTuner}
        mb='10px'
      />

      <Box mb='5px'>
        {pitchDetector.frequency ? `(${pitchDetector.frequency.toFixed(2)} Hz)` : '(- Hz)'}
      </Box>

      <FrequencyProgressIndicator
        active={activeString !== null && pitchDetector.isRunning}
        currentFreq={pitchDetector.frequency || 0}
        targetFreq={StandardNotes[StringToNoteIndex[activeString || 'E']].freq}
        threshold={2}
        boxProps={{ mb: '15px' }}
      />

      <Strings
        activeString={activeString}
        onStringClick={clickedString => setActiveString(clickedString)}
      />
    </Box>
  );
};
