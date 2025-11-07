/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file AppMenu.tsx
 * @author Alexandru Delegeanu
 * @version 0.24
 * @description App menu component.
 */

import { useSessionStorage } from '@/common/hooks/useSessionStorage';
import { NavigationList } from '@/components/AppMenu/Navigation/NavigationList';
import Settings from '@/components/AppMenu/Settings/Settings';
import { SessionStorageKeys } from '@/store/common/storageKeys';
import {
  Box,
  Link as ChakraLink,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, type PropsWithChildren } from 'react';
import { MdCopyright } from 'react-icons/md';
// import { SongsHistory } from '@/components/AppMenu/Navigation/SongsHistory';
import { Loading } from '@/components/Loading/Loading';
import { useAppStore, useShallowAppStore } from '@/store/index';
import { lazy, Suspense } from 'react';

const GuitarTuner = lazy(() => import('@/components/AppMenu/GuitarTuner/GuitarTuner'));

const TabHeader = (props: PropsWithChildren) => {
  const theme = useAppStore(state => state.appTheme.appMenu.tabs);

  return (
    <Tab
      fontWeight='bold'
      // [*] theme colors
      color={theme.title.color}
      _selected={{ color: theme.title.selected.color, borderColor: theme.title.selected.border }}
    >
      {props.children}
    </Tab>
  );
};

export const AppMenu = () => {
  const { theme, appLogoURL } = useShallowAppStore(state => ({
    theme: state.appTheme.appMenu,
    appLogoURL: state.appLogoURL,
  }));

  const [activeTab, setActiveTab] = useSessionStorage<number>(SessionStorageKeys.menuActiveTab, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef(null);

  return (
    <>
      <Box
        cursor='pointer'
        position='fixed'
        top='1rem'
        left='1rem'
        aria-label='App Menu'
        onClick={onOpen}
        ref={btnRef}
        borderStyle='solid'
        borderWidth='thin'
        zIndex={100}
        width='45px'
        height='45px'
        padding={['3px']}
        borderRadius='10px'
        // [*] theme colors
        backgroundColor={theme.menuButton.background}
        borderColor={theme.menuButton.border}
        color={theme.menuButton.text}
        _hover={{ backgroundColor: theme.menuButton.hover }}
      >
        <Image
          src={appLogoURL}
          alt={`Book of Frets theme logo`}
          width='100%'
          height='100%'
          objectFit='cover'
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        // size='xs'
      >
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
                fontWeight='bold'
                // [*] theme colors
                color={theme.drawer.appText}
              >
                Book Of Frets
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody padding='0'>
            <Tabs
              variant='line'
              index={activeTab}
              onChange={setActiveTab}
              // [*] theme colors
              borderColor={theme.tabs.title.border}
            >
              <TabList
                position='sticky'
                top='0'
                // [*] theme colors
                backgroundColor={theme.drawer.background}
              >
                <TabHeader>Navigation</TabHeader>
                <TabHeader>Tuner</TabHeader>
                <TabHeader>Settings</TabHeader>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <NavigationList onItemClick={onClose} />
                  <Divider
                    mt='1em'
                    mb='1em'
                    // [*] theme colors
                    borderColor={theme.items.navigation.routeLink}
                  />
                  {/* <SongsHistory onItemClick={onClose} /> */}
                </TabPanel>

                <TabPanel>
                  <Suspense fallback={<Loading />}>
                    <GuitarTuner />
                  </Suspense>
                </TabPanel>

                <TabPanel>
                  <Settings />
                </TabPanel>
              </TabPanels>
            </Tabs>
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
