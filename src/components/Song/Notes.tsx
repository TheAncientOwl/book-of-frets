/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file SongNotes.tsx
 * @author Alexandru Delegeanu
 * @version 1.1
 * @description Song notes.
 */

import type { TSong } from '@/common/types/song.types';
import { useAppStore } from '@/store/index';
import { Accordion, AccordionButton, AccordionIcon, AccordionPanel } from '@/ui/Accordion';
import { Box, Divider, Flex, Heading, Icon, List, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { RiQuillPenAiFill } from 'react-icons/ri';

type TSongNotesProps = Pick<TSong, 'notes'>;

export const SongNotes = (props: TSongNotesProps) => {
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <>
      {props.notes.length > 0 && (
        <Accordion defaultOpen>
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
            <Heading
              as='h3'
              size='sm'
              textAlign='center'
              // textDecoration='underline'
              textTransform='capitalize'
              // [*] theme colors
              color={theme.items.item.title}
            >
              <Flex
                justifyContent='center'
                alignItems='center'
                gap='0.25em'
                fontSize='lg'
                // [*] theme colors
                color={theme.notes.title}
              >
                <Icon as={RiQuillPenAiFill} />
                Notes
                <Icon as={RiQuillPenAiFill} />
              </Flex>
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
            <Box padding='0.25em 0.5em' mb='1em'>
              <Heading as='h1' size='md' mb='0.5em' textAlign='center'></Heading>

              <List
                textAlign='center'
                // [*] theme colors
                color={theme.notes.title}
              >
                {props.notes.map((note, index) => (
                  <Fragment key={index}>
                    <Text fontSize='sm'>{note}</Text>
                    {index < props.notes.length - 1 && <Divider mt='1em' mb='1em' />}
                  </Fragment>
                ))}
              </List>
            </Box>
          </AccordionPanel>
        </Accordion>
      )}
    </>
  );
};

export default SongNotes;
