/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongsHistory.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
 * @description Songs history.
 */

import type { TSongHistoryEntry } from '@/state/default';
import { useAppState } from '@/state/hooks/useAppState';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Heading, IconButton, List, ListItem, Text } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type TSongsHistoryProps = {
  onItemClick: () => void;
};

export const SongsHistory = (props: TSongsHistoryProps) => {
  const { appMenu: theme } = useAppTheme();
  const { songsHistory } = useAppState();

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
        History
        <IconButton
          ml='5px'
          aria-label='delete history'
          icon={<FaTrashAlt />}
          size='xs'
          colorScheme='red'
          variant='outline'
          onClick={() => {
            songsHistory.set?.([] as TSongHistoryEntry[]);
          }}
        />
      </Heading>

      <List
        display='flex'
        flexDirection='column'
        gap='0.5em'
        mt='1em'
        textAlign='center'
        // [*] theme colors
        color={theme.items.navigation.routeLink}
      >
        {songsHistory.value.map((entry, index) => (
          <ListItem key={index} onClick={props.onItemClick}>
            <Link to={`/${entry.directory}`}>
              <Text isTruncated maxW='100%'>
                {entry.title} | {entry.artists.join(', ')}
              </Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
