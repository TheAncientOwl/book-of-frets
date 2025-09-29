/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file usePitchDetector.ts
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Pitch detector hook.
 */

import { PitchDetector } from 'pitchy';
import { useRef, useState } from 'react';

export type TNotesConfiguration = {
  name: string;
  freq: number;
}[];

const getClosestNote = (freq: number, notes: TNotesConfiguration) => {
  let closest = notes[0];
  let minDiff = Math.abs(freq - closest.freq);
  for (const note of notes) {
    const diff = Math.abs(freq - note.freq);
    if (diff < minDiff) {
      closest = note;
      minDiff = diff;
    }
  }
  return closest.name;
};

export const usePitchDetector = (notes: TNotesConfiguration) => {
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

    if (pitch && clarity > 0.9) {
      setFrequency(pitch);
      setNote(getClosestNote(pitch, notes));
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
      alert(`[!] Error accessing microphone: ${err}`);
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

  return { note, frequency, isRunning, startTuner, stopTuner };
};
