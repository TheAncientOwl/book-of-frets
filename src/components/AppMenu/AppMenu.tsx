/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppMenu.tsx
 * @author Alexandru Delegeanu
 * @version 0.3
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
        colorScheme='green'
        variant='solid'
        color='green.900'
        isRound={true}
        borderStyle='solid'
        borderColor='green.900'
        borderWidth='thin'
        zIndex={10}
      />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent backgroundColor='#237738ff'>
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
                <Link to={`${import.meta.env.BASE_URL}`}>» Home</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`${import.meta.env.BASE_URL}index/chords`}>» Chords</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`${import.meta.env.BASE_URL}index/songs`}>» Songs</Link>
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
                color='green.900'
                _hover={{ color: 'green.100' }}
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
