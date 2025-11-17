/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SkeletonSong.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Display skeleton of song.
 */

import { Accordion, AccordionButton, AccordionIcon, AccordionPanel } from '@/ui/Accordion';
import { useAppStore } from '@/store/index';
import type { TSongTheme } from '@/store/theme/types';
import { Box, Container, Flex, Heading, List, Skeleton, VStack } from '@chakra-ui/react';

const SkeletonHeader = ({ theme }: { theme: TSongTheme }) => {
  return (
    <Flex direction='column' alignItems='center' mb='15px'>
      <Box position='relative' width={['70px', '80px']} height={['70px', '80px']} mb={['5px']}>
        <Skeleton
          height='100%'
          width='100%'
          borderRadius='10px'
          borderWidth='thin'
          // [*] theme colors
          borderColor={theme.header.coverBorder}
        />

        <Skeleton
          height='26px'
          width='26px'
          borderRadius='13px'
          position='absolute'
          right='0'
          top='0'
          transform='translate(50%, -50%)'
        />
      </Box>

      <Skeleton mb='5px' height='24px' width='min(70vw, 150px)' />
      <Skeleton mb='5px' height='20px' width='min(50vw, 100px)' />
      <Skeleton mb='10px' height='18px' width='min(30vw, 80px)' />
      <Skeleton height='15px' width='13px' borderRadius='5px' />
    </Flex>
  );
};

const SkeletonSongChordsList = ({ theme }: { theme: TSongTheme }) => {
  return (
    <Accordion defaultOpen>
      <AccordionButton
        boxProps={{
          borderColor: theme.items.divider,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Heading
          as='h3'
          size='md'
          textDecoration='underline'
          width='100%'
          // [*] theme colors
          color={theme.items.item.title}
        >
          Chords
        </Heading>

        <AccordionIcon
          boxProps={{
            position: 'absolute',
            right: '10px',
          }}
          // [*] theme colors
          color={theme.items.item.title}
        />
      </AccordionButton>

      <AccordionPanel>
        <List display='flex' gap='10px' overflowX='auto' padding={['1.1em 0em', '1.1em 1em']}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              width={['8em', '9em']}
              height={['10.5em', '15em']}
              borderRadius='lg'
            />
          ))}
        </List>
      </AccordionPanel>
    </Accordion>
  );
};

const SkeletonSongSections = ({ theme }: { theme: TSongTheme }) => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Accordion key={index} defaultOpen>
          <AccordionButton
            boxProps={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              // [*] theme colors
              borderColor: theme.items.divider,
            }}
          >
            <Skeleton height='20px' width='110px' />

            <AccordionIcon
              boxProps={{
                position: 'absolute',
                right: '10px',
              }}
              // [*] theme colors
              color={theme.items.item.title}
            />
          </AccordionButton>
          <AccordionPanel>
            <VStack mt='1em' mb='3px'>
              <Skeleton height='20px' width='100px' mb='1em' />
              <Skeleton height='20px' width='100px' mb='1em' />
            </VStack>
          </AccordionPanel>
        </Accordion>
      ))}
    </>
  );
};

export const SkeletonSong = () => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <Container
      maxW={['100vw', '5xl']}
      padding={['25px 0px', '2em 1em']}
      borderRadius={['0em', '0.5em']}
      height='100%'
      overflowY='scroll'
      // [*] theme colors
      backgroundColor={theme.background}
    >
      <SkeletonHeader theme={theme} />

      <Box
        padding={['1.5rem 10px', '1.5rem 1rem']}
        borderRadius='1rem'
        // [*] theme colors
        backgroundColor={theme.items.background}
      >
        <SkeletonSongChordsList theme={theme} />
        <SkeletonSongSections theme={theme} />
      </Box>
    </Container>
  );
};
