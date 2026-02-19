/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file Accordion.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Accordion components.
 */

import { Box, Collapse, type BoxProps } from '@chakra-ui/react';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import type { IconBaseProps } from 'react-icons/lib';

type TAccordionContext = {
  isOpen: boolean;
  toggle: () => void;
};

const AccordionContext = createContext<TAccordionContext | undefined>(undefined);

type TAccordionProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  boxProps?: BoxProps;
};

export const Accordion = (props: TAccordionProps) => {
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <Box {...props.boxProps}>{props.children}</Box>
    </AccordionContext.Provider>
  );
};

type TAccordionButtonProps = {
  children: ReactNode;
  boxProps?: BoxProps;
};

export const AccordionButton = (props: TAccordionButtonProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionButton must be used inside an Accordion');

  return (
    <Box
      as='button'
      cursor='pointer'
      width='100%'
      onClick={context.toggle}
      borderTop='solid'
      borderTopWidth='thin'
      borderBottomRadius='5px'
      backgroundColor='blackAlpha.100'
      pt={['7px', '8px']}
      pb={['7px', '8px']}
      {...props.boxProps}
    >
      {props.children}
    </Box>
  );
};

type TAccordionPanelProps = {
  children: ReactNode;
  boxProps?: BoxProps;
};

export const AccordionPanel = (props: TAccordionPanelProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionPanel must be used inside an Accordion');

  return (
    <Collapse in={context.isOpen} animateOpacity>
      {props.children}
    </Collapse>
  );
};

type TAccordionIconProps = IconBaseProps & {
  boxProps?: BoxProps;
};

export const AccordionIcon = ({ boxProps, ...iconProps }: TAccordionIconProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionIcon must be used inside an Accordion');

  return (
    <Box {...boxProps}>
      <HiChevronDown
        style={{
          transition: 'transform 0.2s',
          transform: context.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
        aria-hidden='true'
        {...iconProps}
      />
    </Box>
  );
};
