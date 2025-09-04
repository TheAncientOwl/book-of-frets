/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppMenu.tsx
 * @author Alexandru Delegeanu
 * @version 0.1
 * @description App menu component.
 */

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  List,
  ListItem,
  Text,
  Image,
  useDisclosure,
  Flex,
  Box,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { MdMenu } from 'react-icons/md';
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
        icon={<MdMenu />}
        colorScheme='blue'
        variant='solid'
        color='blue.900'
        isRound={true}
        borderStyle='solid'
        borderColor='blue.900'
        borderWidth='thin'
      />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent bgColor='blue.300'>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex direction='row' gap='5px'>
              <Image src='/book-of-frets.svg' alt='Book of Frets Logo' maxW='25px' />
              <Box as='span'>Book Of Frets</Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <List display='flex' flexDirection='column' gap='0.5em' fontWeight='bold'>
              <ListItem onClick={onClose}>
                <Link to='/'>» Home</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to='/index/chords'>» Chords</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to='/index/songs'>» Songs</Link>
              </ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter>
            <ChakraLink
              href='https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE'
              borderBottom='1px solid'
              borderColor='blue.900'
              isExternal
              _hover={{ textDecor: 'none' }}
            >
              <Text
                display='flex'
                alignItems='center'
                gap='5px'
                color='blue.900'
                _hover={{ color: 'blue.100' }}
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
