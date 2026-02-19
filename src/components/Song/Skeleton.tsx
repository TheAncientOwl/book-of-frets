/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SkeletonSong.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Display skeleton of song.
 */

import { Accordion, AccordionButton, AccordionIcon, AccordionPanel } from '@/ui/Accordion';
import { useAppStore } from '@/store/index';
import type { TSongTheme } from '@/store/theme/types';
import { Box, Container, Flex, Heading, List, Skeleton, VStack } from '@chakra-ui/react';

const SkeletonHeader = ({ theme }: { theme: TSongTheme }) => {
  return (
    <Flex direction='column' alignItems='center' mb='0.5em' overflowX='hidden'>
      <Box
        position='relative'
        width={['70px', '80px']}
        height={['70px', '80px']}
        mb={['5px']}
        mt='1em'
        overflow='visible'
      >
        {/* Cover */}
        <Skeleton
          height='100%'
          width='100%'
          borderRadius='10px'
          borderWidth='thin'
          borderColor={theme.header.coverBorder}
        />

        {/* Capo circle */}
        <Skeleton
          position='absolute'
          right='0'
          top='0'
          transform='translate(50%, -50%)'
          borderRadius='full'
          width='2em'
          height='2em'
          borderWidth='thin'
        />

        {/* Right buttons column (PDF / Lyrics) */}
        <Flex
          flexDirection='column'
          top='0'
          left={['7em', '8em']}
          position='absolute'
          justifyContent='center'
          alignItems='center'
          gap='10px'
          height='100%'
        >
          <Skeleton width='32px' height='32px' borderRadius='md' />
        </Flex>

        {/* Left buttons column (YouTube) */}
        <Flex
          flexDirection='column'
          top='0'
          right={['7em', '8em']}
          position='absolute'
          justifyContent='center'
          alignItems='center'
          gap='10px'
          height='100%'
        >
          <Skeleton width='32px' height='32px' borderRadius='md' />
          <Skeleton width='32px' height='32px' borderRadius='md' />
        </Flex>

        {/* Type + contributors column */}
        <Flex
          position='absolute'
          right='-1.25em'
          bottom='0'
          direction='column'
          gap='4px'
          justifyContent='center'
          alignItems='center'
        >
          <Skeleton width='14px' height='14px' borderRadius='sm' />
          <Skeleton width='15px' height='15px' borderRadius='sm' />
        </Flex>
      </Box>

      {/* Title */}
      <Skeleton mb='5px' height='24px' width='min(70vw, 200px)' />

      {/* Artists */}
      <Skeleton mb='5px' height='20px' width='min(50vw, 150px)' />
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
          fontSize='lg'
          // textDecoration='underline'
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
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              width={['5.8em', '6.5em']}
              height={['9.5em', '11.4em']}
              borderRadius='lg'
            />
          ))}
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              '@keyframes pulseDots': {
                '0%': { opacity: 0.3 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.3 },
              },
              animation: 'pulseDots 1.2s ease-in-out infinite',
            }}
          >
            <Skeleton borderRadius='full' width='0.85em' height='0.85em' borderWidth='thin' />
            <Skeleton borderRadius='full' width='0.85em' height='0.85em' borderWidth='thin' />
            <Skeleton borderRadius='full' width='0.85em' height='0.85em' borderWidth='thin' />
          </Box>
        </List>
      </AccordionPanel>
    </Accordion>
  );
};

const SkeletonSongSections = ({ theme }: { theme: TSongTheme }) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
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
            <VStack mt='1em' mb='3px' gap='0.2em'>
              <Skeleton height='20px' width='200px' mb='1em' />
              <Skeleton height='20px' width='200px' mb='1em' />
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
      padding={['0.5em 0px', '1em']}
      borderRadius={['0em', '0.5em']}
      height='100%'
      overflowY='scroll'
      // [*] theme colors
      backgroundColor={theme.background}
    >
      <SkeletonHeader theme={theme} />

      <Box
        padding={['1em 5px', '1em 1em']}
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
