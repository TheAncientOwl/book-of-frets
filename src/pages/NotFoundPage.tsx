/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by OopsieLogsy 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/oopsie-logsy/blob/main/LICENSE
 *
 * @file NotFoundPage.tsx
 * @author Alexandru Delegeanu
 * @version 1.0
 * @description Display 404 not found page.
 */

import { setDocumentThemeColor } from '@/store/theme/utils/setDocumentThemeColor';
import { useAppStore } from '@/store/index';
import { Box, Button, Container, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const pageBackground = useAppStore(state => state.appTheme.general.background);

  useLayoutEffect(() => setDocumentThemeColor(pageBackground), [pageBackground]);

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        backgroundColor='blackAlpha.300'
        textAlign='center'
        p={6}
        _hover={{ transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out' }}
        transition='transform 0.3s ease-in-out'
      >
        <Text fontSize='3xl' fontWeight='bold' mb={5} color='whiteAlpha.900'>
          These are not the frets <br />
          you’re looking for 🎸
        </Text>

        <Tooltip
          backgroundColor='blackAlpha.900'
          label={
            <Flex
              padding='10px'
              borderRadius='5px'
              direction='column'
              justifyContent='center'
              alignItems='center'
              color='purple.600'
            >
              <Text>sad...</Text>
              <Text>And sad backwards is das</Text>
              <Text>And das' not good... :(</Text>
            </Flex>
          }
        >
          <Image borderRadius='20px' src={`${import.meta.env.BASE_URL}404.gif`} mb={2} />
        </Tooltip>

        <Text fontSize='md' fontWeight='bold' color='purple.500' mb={10}>
          Page Not Found
        </Text>

        <Button
          colorScheme='purple'
          onClick={() => {
            navigate('/songs');
          }}
        >
          Take me home, country roads
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
