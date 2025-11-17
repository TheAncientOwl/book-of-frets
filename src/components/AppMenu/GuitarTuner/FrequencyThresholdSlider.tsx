/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file FrequencyThresholdSlider.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description UI display of frequency threshold.
 */

import { useAppStore } from '@/store/index';
import {
  Heading,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';

type TFrequencyThresholdSlider = {
  threshold: number;
  onThresholdChange: Dispatch<SetStateAction<number>>;
  containerProps?: TFrequencyThresholdSlider;
};

export const FrequencyThresholdSlider = (props: TFrequencyThresholdSlider) => {
  const theme = useAppStore(state => state.appTheme.appMenu.items.tuner);

  return (
    <SimpleGrid {...props.containerProps} columns={[1, 2]} gap='5px'>
      <Heading
        size='sm'
        as='h5'
        // [*] theme colors
        color={theme.thresholdSlider.color}
      >
        Frequency Threshold
        <br /> {props.threshold} Hz
      </Heading>
      <Slider
        value={props.threshold}
        onChange={val => props.onThresholdChange(val)}
        min={0}
        max={5}
        step={0.1}
      >
        <SliderTrack
          // [*] theme colors
          backgroundColor={theme.thresholdSlider.slider.track}
        >
          <SliderFilledTrack
            // [*] theme colors
            backgroundColor={theme.thresholdSlider.slider.filler}
          />
        </SliderTrack>
        <Tooltip
          label={`${props.threshold} Hz`}
          fontWeight='bold'
          // [*] theme colors
          backgroundColor={theme.thresholdSlider.slider.tooltip.background}
          color={theme.thresholdSlider.slider.tooltip.color}
        >
          <SliderThumb
            // [*] theme colors
            backgroundColor={theme.thresholdSlider.slider.thumb}
          />
        </Tooltip>
      </Slider>
    </SimpleGrid>
  );
};
