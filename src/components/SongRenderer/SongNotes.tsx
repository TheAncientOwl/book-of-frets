/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongNotes.tsx
 * @author Alexandru Delegeanu
 * @version 0.2
 * @description Song notes.
 */

import type { TSong } from '@/common/types/song.types';
import { useAppTheme } from '@/state/hooks/useAppTheme';
import { Box, Divider, Flex, Heading, Icon, List, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { RiQuillPenAiFill } from 'react-icons/ri';

type TSongNotesProps = Pick<TSong, 'notes'>;

export const SongNotes = (props: TSongNotesProps) => {
  const { song: theme } = useAppTheme();

  return (
    <Fragment>
      {props.notes.length > 0 && (
        <Box mt='1em' padding='1em 1.25em'>
          <Heading as='h1' size='md' mb='1em' textAlign='center'>
            <Flex
              justifyContent='center'
              alignItems='center'
              gap='0.25em'
              // [*] theme colors
              color={theme.notes.title}
            >
              <Icon as={RiQuillPenAiFill} />
              Notes
              <Icon as={RiQuillPenAiFill} />
            </Flex>
          </Heading>

          <List
            textAlign='center'
            // [*] theme colors
            color={theme.notes.title}
          >
            {props.notes.map((note, index) => (
              <Fragment key={index}>
                <Text>{note}</Text>
                {index < props.notes.length - 1 && <Divider mt='1em' mb='1em' />}
              </Fragment>
            ))}
          </List>
        </Box>
      )}
    </Fragment>
  );
};
