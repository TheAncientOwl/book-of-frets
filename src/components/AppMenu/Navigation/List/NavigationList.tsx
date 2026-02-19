/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file NavigationList.tsx
 * @author Alexandru Delegeanu
 * @version 1.3
 * @description Navigation links.
 */

import { useSessionStorage } from '@/common/hooks/useSessionStorage';
import { SessionStorageKeys } from '@/store/common/storageKeys';
import { useAppStore } from '@/store/index';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type TNavigationListProps = {
  onItemClick: () => void;
};

export const NavigationList = (props: TNavigationListProps) => {
  const [, setScrollTop] = useSessionStorage(SessionStorageKeys.listScrollTop, 0);

  const theme = useAppStore(state => state.appTheme.appMenu);

  return (
    <Box>
      <Heading
        as='h3'
        size='md'
        textAlign='center'
        // textDecoration='underline'
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
        <ListItem
          onClick={() => {
            setScrollTop(0);
            props.onItemClick();
          }}
        >
          <Link to={`/`}>Songs</Link>
        </ListItem>
        <ListItem onClick={props.onItemClick}>
          <Link to={`/chords`}>Chords</Link>
        </ListItem>
        <ListItem onClick={props.onItemClick}>
          <Link to={`/about`}>About</Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default NavigationList;
