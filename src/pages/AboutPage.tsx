/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AboutPage.tsx
 * @author Alexandru Delegeanu
 * @version 0.11
 * @description App homepage.
 */

import { setDocumentThemeColor } from '@/store/theme/utils/setDocumentThemeColor';
import { useShallowAppStore } from '@/store/index';
import { Box, Container, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { Link as RouteLink } from 'react-router-dom';

export const AboutPage = () => {
  const { pageBackground, theme } = useShallowAppStore(state => ({
    pageBackground: state.appTheme.general.background,
    theme: state.appTheme.homePage,
  }));

  useLayoutEffect(() => setDocumentThemeColor(pageBackground), [pageBackground]);

  return (
    <Container height='100%' overflowY='scroll' pt='3rem' color='white' maxW='4xl'>
      <Heading
        as='h1'
        textAlign='center'
        mb='3rem'
        // [*] theme colors
        color={theme.title}
      >
        Book Of Frets
      </Heading>

      <Box
        mb='2rem'
        // [*] theme colors
        color={theme.paragraph}
      >
        <Text>
          BookOfFrets is a web-based application designed to help guitar enthusiasts learn and
          explore songs through an interactive fretboard. It features a comprehensive collection of
          songs with detailed frets, strumming patterns, chords,{' '}
          <Link
            as={RouteLink}
            to='/index/chords'
            // [*] theme colors
            color={theme.link}
          >
            chords list
          </Link>
          ,{' '}
          <Link
            as={RouteLink}
            to='/index/songs'
            // [*] theme colors
            color={theme.link}
          >
            songs list
          </Link>
          , and customizable{' '}
          <Link
            as={RouteLink}
            to='/settings'
            // [*] theme colors
            color={theme.link}
          >
            themes
          </Link>
          .
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading
          as='h2'
          size='lg'
          mb='1rem'
          // [*] theme colors
          color={theme.heading}
        >
          ✨ Features
        </Heading>
        <UnorderedList
          spacing='1rem'
          pl='1.5rem'
          // [*] theme colors
          color={theme.listItem}
        >
          <ListItem>
            🎵{' '}
            <Box as='span' fontWeight='bold'>
              Songs with Frets
            </Box>
            : Visualize songs with precise fret positions to help you learn finger placements.
          </ListItem>
          <ListItem>
            🎼
            <Box as='span' fontWeight='bold'>
              Chords
            </Box>
            : Access a rich library of chords with clear diagrams.
          </ListItem>
          <ListItem>
            📖
            <Box as='span' fontWeight='bold'>
              Chords List
            </Box>
            : Browse and search through a curated list of chords.
          </ListItem>
          <ListItem>
            📂
            <Box as='span' fontWeight='bold'>
              Songs List
            </Box>
            : Easily navigate through a growing collection of songs.
          </ListItem>
          <ListItem>
            🎨
            <Box as='span' fontWeight='bold'>
              Themes
            </Box>
            : Customize the look and feel of the app with various themes.
          </ListItem>
          <ListItem>
            📺
            <Box as='span' fontWeight='bold'>
              Video Resources
            </Box>
            : Learn how to play songs with helpful video tutorials.
          </ListItem>
        </UnorderedList>
      </Box>

      <Box mb='2rem'>
        <Heading
          as='h2'
          size='lg'
          mb='1rem'
          // [*] theme colors
          color={theme.heading}
        >
          🛠️ Main Feature
        </Heading>
        <Text
          // [*] theme colors
          color={theme.paragraph}
        >
          BookOfFrets is easily configurable via JSON files, allowing users and contributors to add
          new songs, chords, and themes without modifying the core code. This extensibility makes it
          simple to expand the app's content and tailor it to your preferences.
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading
          as='h2'
          size='lg'
          mb='1rem'
          // [*] theme colors
          color={theme.heading}
        >
          🎶 Motivation
        </Heading>
        <Text
          // [*] theme colors
          color={theme.paragraph}
        >
          As a guitar learner, I found myself frustrated with the tedious process of writing chords
          and songs by hand. I wanted a prettier, more extensible solution that could grow with my
          learning journey. BookOfFrets was born out of this desire to create an intuitive and
          visually appealing tool that makes learning guitar more enjoyable and accessible.
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading
          as='h2'
          size='lg'
          mb='1rem'
          // [*] theme colors
          color={theme.heading}
        >
          🤝 Contribution
        </Heading>
        <Text
          // [*] theme colors
          color={theme.paragraph}
        >
          <Link
            href='https://github.com/TheAncientOwl/book-of-frets/blob/main/CONTRIBUTING.md'
            isExternal
            mr='5px'
            // [*] theme colors
            color={theme.link}
          >
            Contributions
          </Link>
          are welcome and encouraged! If you have new songs, chords, or themes to share, please
          submit a pull request. There are plenty of songs to showcase theme/chord/song
          configuration! Help us make BookOfFrets better for everyone.
        </Text>
      </Box>

      <Box mb='2rem'>
        <Heading
          as='h2'
          size='lg'
          mb='1rem'
          // [*] theme colors
          color={theme.heading}
        >
          📜 License
        </Heading>
        <Text
          // [*] theme colors
          color={theme.paragraph}
        >
          This project is licensed under the{' '}
          <Link
            href='https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE'
            isExternal // [*] theme colors
            color={theme.link}
          >
            MIT License
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
};

export default AboutPage;
