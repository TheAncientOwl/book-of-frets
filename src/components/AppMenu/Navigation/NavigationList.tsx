/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file NavigationList.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description Navigation links.
 */

import { useAppTheme } from '@/context/AppState';
import { List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type TNavigationListProps = {
  onItemClick: () => void;
};

export const NavigationList = (props: TNavigationListProps) => {
  const { appMenu: theme } = useAppTheme();

  return (
    <List
      display='flex'
      flexDirection='column'
      gap='0.5em'
      fontWeight='bold'
      // [*] theme colors
      color={theme.items.navigation.routeLink}
    >
      <ListItem onClick={props.onItemClick}>
        <Link to={`/`}>» Home</Link>
      </ListItem>
      <ListItem onClick={props.onItemClick}>
        <Link to={`/index/songs`}>» Songs</Link>
      </ListItem>
      <ListItem onClick={props.onItemClick}>
        <Link to={`/index/chords`}>» Chords</Link>
      </ListItem>
    </List>
  );
};
