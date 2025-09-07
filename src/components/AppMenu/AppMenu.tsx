/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppMenu.tsx
 * @author Alexandru Delegeanu
 * @version 0.11
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

import { useAppStateContext, useAppTheme } from '@/context/AppState';
import { IoMdMusicalNote } from 'react-icons/io';
import { MdCopyright } from 'react-icons/md';

// TODO: Implement songs history
export const AppMenu = () => {
  const { appMenu: theme } = useAppTheme();
  const { appLogoURL } = useAppStateContext();

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
        // [*] theme colors
        backgroundColor={theme.menuButton.background}
        borderColor={theme.menuButton.border}
        color={theme.menuButton.text}
        _hover={{ backgroundColor: theme.menuButton.hover }}
      />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          // [*] theme colors
          backgroundColor={theme.drawer.background}
        >
          <DrawerCloseButton
            // [*] theme colors
            color={theme.closeButton.color}
          />
          <DrawerHeader>
            <Flex direction='row' gap='5px'>
              <Image src={appLogoURL} alt='Book of Frets Logo' maxW='25px' />
              <Box
                as='span'
                // [*] theme colors
                color={theme.drawer.appText}
              >
                Book Of Frets
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <List
              display='flex'
              flexDirection='column'
              gap='0.5em'
              fontWeight='bold'
              // [*] theme colors
              color={theme.drawer.routeLink}
            >
              <ListItem onClick={onClose}>
                <Link to={`/`}>» Home</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`/index/chords`}>» Chords</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`/index/songs`}>» Songs</Link>
              </ListItem>
              <ListItem onClick={onClose}>
                <Link to={`/settings`}>» Settings</Link>
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
                // [*] theme colors
                color={theme.copyright.color}
                _hover={{ color: theme.copyright.hoverColor }}
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
