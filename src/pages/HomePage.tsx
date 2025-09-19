/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file HomePage.tsx
 * @author Alexandru Delegeanu
 * @version 0.6
 * @description App homepage.
 */

import { Link as RouteLink } from 'react-router-dom';
import { Container, Heading, Text, UnorderedList, ListItem, Link, Box } from '@chakra-ui/react';
import { useAppTheme } from '@/context/AppState';
import { useLayoutEffect } from 'react';
import { setDocumentThemeColor } from '@/theme/setDocumentThemeColor';

export const HomePage = () => {
  const { general: theme } = useAppTheme();

  useLayoutEffect(() => setDocumentThemeColor(theme.background), [theme.background]);

  return (
    <Container height='100%' overflowY='scroll' pt='3rem' color='white' maxW='4xl'>
      <Heading as='h1' textAlign='center' mb='3rem'>
        Book Of Frets
      </Heading>

      <Box mb='2rem'>
        <Text>
          BookOfFrets is a web-based application designed to help guitar enthusiasts learn and
          explore songs through an interactive fretboard. It features a comprehensive collection of
          songs with detailed frets, strumming patterns, chords,{' '}
          <Link as={RouteLink} color='cyan.400' to='/index/chords'>
            chords list
          </Link>
          ,{' '}
          <Link as={RouteLink} color='cyan.400' to='/index/songs'>
            songs list
          </Link>
          , and customizable{' '}
          <Link as={RouteLink} color='cyan.400' to='/settings'>
            themes
          </Link>
          .
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading as='h2' size='lg' mb='1rem'>
          ✨ Features
        </Heading>
        <UnorderedList spacing='1rem' pl='1.5rem'>
          <ListItem>
            🎵 Songs with Frets: Visualize songs with precise fret positions to help you learn
            finger placements.
          </ListItem>
          <ListItem>🎼 Chords: Access a rich library of chords with clear diagrams.</ListItem>
          <ListItem>📖 Chords List: Browse and search through a curated list of chords.</ListItem>
          <ListItem>📂 Songs List: Easily navigate through a growing collection of songs.</ListItem>
          <ListItem>
            🎨 Themes: Customize the look and feel of the app with various themes.
          </ListItem>
          <ListItem>
            📺 Video Resources: Learn how to play songs with helpful video tutorials.
          </ListItem>
        </UnorderedList>
      </Box>

      <Box mb='2rem'>
        <Heading as='h2' size='lg' mb='1rem'>
          🛠️ Main Feature
        </Heading>
        <Text>
          BookOfFrets is easily configurable via JSON files, allowing users and contributors to add
          new songs, chords, and themes without modifying the core code. This extensibility makes it
          simple to expand the app's content and tailor it to your preferences.
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading as='h2' size='lg' mb='1rem'>
          🎶 Motivation
        </Heading>
        <Text>
          As a guitar learner, I found myself frustrated with the tedious process of writing chords
          and songs by hand. I wanted a prettier, more extensible solution that could grow with my
          learning journey. BookOfFrets was born out of this desire to create an intuitive and
          visually appealing tool that makes learning guitar more enjoyable and accessible.
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading as='h2' size='lg' mb='1rem'>
          🤝 Contribution
        </Heading>
        <Text>
          <Link
            href='https://github.com/TheAncientOwl/book-of-frets/blob/main/CONTRIBUTING.md'
            isExternal
            color='cyan.400'
            mr='5px'
          >
            Contributions
          </Link>
          are welcome and encouraged! If you have new songs, chords, or themes to share, please
          submit a pull request. There are plenty of songs to showcase theme/chord/song
          configuration! Help us make BookOfFrets better for everyone.
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading as='h2' size='lg' mb='1rem'>
          📜 License
        </Heading>
        <Text>
          This project is licensed under the{' '}
          <Link
            href='https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE'
            isExternal
            color='cyan.400'
          >
            MIT License
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
};
