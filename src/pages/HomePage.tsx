/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file HomePage.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description App homepage.
 */

import { Container, Heading } from '@chakra-ui/react';

export const HomePage = () => {
  return (
    <Container pt='3rem' color='white'>
      <Heading as='h1' textAlign='center' mb='5rem'>
        Book Of Frets
      </Heading>

      <Heading as='h3' textAlign='center' size='md'>
        Coming Soon...
      </Heading>
    </Container>
  );
};
