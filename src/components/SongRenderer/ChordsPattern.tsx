/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsPattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description Render song chords pattern.
 */

import { Divider, Flex, Tag } from '@chakra-ui/react';
import React from 'react';
import { ChordsPatternSegment } from './ChordsPatternSegment.tsx';
import type { TChordsPattern } from '../../configs/types/song.types.ts';
import type { TChordsIndex } from '../../configs/types/chord.types.ts';

type TChordsPatternProps = TChordsPattern & {
  showChordTimes: boolean;
  chordsIndex: TChordsIndex;
};

export const ChordsPattern = (props: TChordsPatternProps) => {
  return (
    <Flex direction='row' gap='1em' alignItems='center' position='relative'>
      <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
      {props.segments.map((segment, segmentIndex) => (
        <React.Fragment key={segmentIndex}>
          <ChordsPatternSegment
            {...segment}
            chordsIndex={props.chordsIndex}
            showChordTimes={props.showChordTimes}
          />

          <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
        </React.Fragment>
      ))}
      <Tag
        size='sm'
        fontWeight='bold'
        backgroundColor='blue.200'
        position='absolute'
        top='50%'
        right='0'
        transform='translate(140%, -50%)'
      >
        x{props.times}
      </Tag>
    </Flex>
  );
};
