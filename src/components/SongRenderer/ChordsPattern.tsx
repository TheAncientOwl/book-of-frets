/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file ChordsPattern.tsx
 * @author Alexandru Delegeanu
 * @version 0.8
 * @description Render song chords pattern.
 */

import { Fragment } from 'react';

import { Divider, Flex, Tag } from '@chakra-ui/react';

import type { TChordsIndex } from '@/configs/types/chord.types.ts';
import type { TChordsPattern } from '@/configs/types/song.types.ts';

import { ChordsPatternSegment } from '@/components/SongRenderer/ChordsPatternSegment.tsx';

type TChordsPatternProps = TChordsPattern & {
  showChordTimes: boolean;
  chordsIndex: TChordsIndex;
};

export const ChordsPattern = (props: TChordsPatternProps) => {
  return (
    <Flex
      direction='row'
      gap='1em'
      alignItems='center'
      justifyContent='center'
      position='relative'
      width='100%'
    >
      <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />

      {props.segments.map((segment, segmentIndex) => (
        <Fragment key={segmentIndex}>
          <ChordsPatternSegment
            {...segment}
            chordsIndex={props.chordsIndex}
            showChordTimes={props.showChordTimes}
          />

          <Divider orientation='vertical' height='80px' borderColor='gray.200' borderWidth='thin' />
        </Fragment>
      ))}

      <Tag
        size='sm'
        width='30px'
        fontWeight='bold'
        backgroundColor='blue.200'
        position='absolute'
        top='50%'
        right='0'
        transform='translate(0%, -50%)'
        zIndex={1}
      >
        x{props.times}
      </Tag>
    </Flex>
  );
};
