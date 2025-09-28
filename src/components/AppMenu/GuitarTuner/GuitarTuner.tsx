/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file GuitarTuner.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Main tuner component.
 */

import { Box, Button } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { PitchDetector } from 'pitchy';

const StandardNotes = [
  { name: 'E2', freq: 82.41 },
  { name: 'A2', freq: 110.0 },
  { name: 'D3', freq: 146.83 },
  { name: 'G3', freq: 196.0 },
  { name: 'B3', freq: 246.94 },
  { name: 'E4', freq: 329.63 },
];

const getClosestNote = (freq: number) => {
  let closest = StandardNotes[0];
  let minDiff = Math.abs(freq - closest.freq);
  for (const note of StandardNotes) {
    const diff = Math.abs(freq - note.freq);
    if (diff < minDiff) {
      closest = note;
      minDiff = diff;
    }
  }
  return closest.name;
};

export const GuitarTuner = () => {
  const [note, setNote] = useState('-');
  const [frequency, setFrequency] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);
  const inputRef = useRef<Float32Array<ArrayBuffer> | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const detectPitch = () => {
    if (
      !audioContextRef.current ||
      !analyserRef.current ||
      !detectorRef.current ||
      !inputRef.current
    ) {
      return;
    }
    const analyser = analyserRef.current;
    const detector = detectorRef.current;
    const input = inputRef.current;

    analyser.getFloatTimeDomainData(input);
    const [pitch, clarity] = detector.findPitch(input, audioContextRef.current.sampleRate);

    if (pitch && clarity > 0.8) {
      setFrequency(pitch);
      setNote(getClosestNote(pitch));
    }

    animationFrameIdRef.current = requestAnimationFrame(detectPitch);
  };

  const startTuner = async () => {
    if (isRunning) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      source.connect(analyser);
      const detector = PitchDetector.forFloat32Array(analyser.fftSize);
      detectorRef.current = detector;
      inputRef.current = new Float32Array(analyser.fftSize);
      setIsRunning(true);
      detectPitch();
    } catch (err) {
      console.error('Error accessing microphone', err);
    }
  };

  const stopTuner = () => {
    if (!isRunning) {
      return;
    }

    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    audioContextRef.current?.close();
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());

    animationFrameIdRef.current = null;
    audioContextRef.current = null;
    mediaStreamRef.current = null;
    analyserRef.current = null;
    detectorRef.current = null;
    inputRef.current = null;
    setIsRunning(false);
    setNote('-');
    setFrequency(null);
  };

  return (
    <Box
      textAlign='center'
      // [*] theme colors
      color='white'
    >
      <Box>Note: {note}</Box>
      <Box>Frequency: {frequency ? `(${frequency.toFixed(2)} Hz)` : ''}</Box>
      <Box mt={4}>
        <Button onClick={startTuner} isDisabled={isRunning} mr={2}>
          Start
        </Button>
        <Button onClick={stopTuner} isDisabled={!isRunning}>
          Stop
        </Button>
      </Box>
    </Box>
  );
};
