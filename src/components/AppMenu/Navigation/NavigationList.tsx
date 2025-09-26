/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file NavigationList.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Navigation links.
 */

import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type TNavigationListProps = {
  onItemClick: () => void;
};

export const NavigationList = (props: TNavigationListProps) => {
  const { appMenu: theme } = useAppTheme();

  return (
    <Box>
      <Heading
        as='h3'
        size='md'
        textAlign='center'
        textDecoration='underline'
        // [*] theme colors
        color={theme.items.navigation.routeLink}
      >
        Explore
      </Heading>

      <List
        display='flex'
        flexDirection='column'
        gap='0.5em'
        fontWeight='bold'
        textAlign='center'
        mt='1em'
        // [*] theme colors
        color={theme.items.navigation.routeLink}
      >
        <ListItem onClick={props.onItemClick}>
          <Link to={`/`}>Home</Link>
        </ListItem>
        <ListItem onClick={props.onItemClick}>
          <Link to={`/index/songs`}>Songs</Link>
        </ListItem>
        <ListItem onClick={props.onItemClick}>
          <Link to={`/index/chords`}>Chords</Link>
        </ListItem>
      </List>
    </Box>
  );
};
