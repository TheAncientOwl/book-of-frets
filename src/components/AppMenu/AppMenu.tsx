/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppMenu.tsx
 * @author Alexandru Delegeanu
 * @version 0.7
 * @description App menu component.
 */

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { IoMdMusicalNote } from 'react-icons/io';
import { MdCopyright } from 'react-icons/md';

// TODO: Implement songs history
export const AppMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <IconButton
        position='fixed'
        top='1rem'
        left='1rem'
        aria-label='App Menu'
        onClick={onOpen}
        ref={btnRef}
        icon={<IoMdMusicalNote />}
        variant='solid'
        isRound={true}
        borderStyle='solid'
        borderWidth='thin'
        zIndex={10}
      />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex direction='row' gap='5px'>
              <Image
                src={`${import.meta.env.BASE_URL}book-of-frets.svg`}
                alt='Book of Frets Logo'
                maxW='25px'
              />
              <Box as='span'>Book Of Frets</Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <List display='flex' flexDirection='column' gap='0.5em' fontWeight='bold'>
              <ListItem onClick={onClose}>
                <Link to={`/`}>» Home</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`/index/chords`}>» Chords</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`/index/songs`}>» Songs</Link>
              </ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter display='flex' justifyContent='center'>
            <ChakraLink
              href='https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE'
              isExternal
              _hover={{ textDecor: 'none' }}
            >
              <Text
                display='flex'
                alignItems='center'
                gap='5px'
                // _hover={{ color: 'TODO' }}
              >
                Copyright <Icon as={MdCopyright} /> 2025 BookOfFrets
              </Text>
            </ChakraLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
