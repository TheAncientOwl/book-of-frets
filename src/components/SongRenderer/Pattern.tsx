/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file Pattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Render song chords pattern.
 */

import { Divider, Flex, Tag } from '@chakra-ui/react';
import React from 'react';
import { PatternSegment, type IPatternSegmentProps } from './PatternSegment';

export interface IPatternProps {
  times: number;
  segments: IPatternSegmentProps[];
}

export const Pattern = (props: IPatternProps) => {
  return (
    <Flex direction='row' gap='1em' alignItems='center'>
      <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
      {props.segments.map((segment, segmentIndex) => (
        <React.Fragment key={segmentIndex}>
          <PatternSegment {...segment} />

          <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
        </React.Fragment>
      ))}
      <Tag size='sm' fontWeight='bold' backgroundColor='blue.200'>
        x{props.times}
      </Tag>
    </Flex>
  );
};
