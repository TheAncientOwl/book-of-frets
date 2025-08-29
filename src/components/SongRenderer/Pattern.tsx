/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Pattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Render song chords pattern.
 */

import { Divider, Flex, Tag } from '@chakra-ui/react';
import React from 'react';
import { PatternSegment } from './PatternSegment';
import type { IPattern } from '../../configs/types/song.types.ts';
import type { TChordsIndex } from '../../configs/types/chord.types.ts';

interface IPatternProps extends IPattern {
  showChordTimes: boolean;
  chordsIndex: TChordsIndex;
}

export const Pattern = (props: IPatternProps) => {
  return (
    <Flex direction='row' gap='1em' alignItems='center'>
      <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
      {props.segments.map((segment, segmentIndex) => (
        <React.Fragment key={segmentIndex}>
          <PatternSegment
            {...segment}
            chordsIndex={props.chordsIndex}
            showChordTimes={props.showChordTimes}
          />

          <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
        </React.Fragment>
      ))}
      <Tag size='sm' fontWeight='bold' backgroundColor='blue.200'>
        x{props.times}
      </Tag>
    </Flex>
  );
};
