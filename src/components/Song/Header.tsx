/**
 * -------------------------------------------------------------------------- *
 *                     Copyright (c) by BookOfFrets 2025                      *
 * -------------------------------------------------------------------------- *
 * @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
 *
 * @file SongHeader.tsx
 * @author Alexandru Delegeanu
 * @version 1.4
 * @description Render song header data.
 */

import type { TSong } from '@/common/types/song.types';
import { useAppStore } from '@/store/index';
import { Box, Circle, Flex, Heading, Image, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { GiGuitarBassHead, GiGuitarHead } from 'react-icons/gi';
import { PiFinnTheHumanDuotone } from 'react-icons/pi';
import { FetchLyricsButton } from '@/components/Song/Buttons/FetchLyricsButton';
import { OpenPDFButton } from '@/components/Song/Buttons/OpenPDFButton';
import YoutubeButton from '@/components/Song/Buttons/YoutubeButton';

type TSongHeaderProps = Pick<
  TSong,
  'title' | 'artists' | 'capo' | 'type' | 'contributors' | 'lyrics' | 'res'
> & {
  directory: string;
  lyricsShown: boolean;
  onToggleLyrics: () => void;
};

const typeToIcon = {
  acoustic: <GiGuitarHead />,
  electric: <GiGuitarBassHead />,
};

export const SongHeader = (props: TSongHeaderProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const theme = useAppStore(state => state.appTheme.song);

  return (
    <Flex direction='column' alignItems='center' mb='10px' overflowX='hidden'>
      <Box
        position='relative'
        width={['70px', '80px']}
        height={['70px', '80px']}
        mb={['5px']}
        mt='1em'
        overflow='visible'
      >
        <Skeleton isLoaded={isImageLoaded} width='100%' height='100%' borderRadius='10px'>
          <Image
            src={`${import.meta.env.BASE_URL}songs/${props.directory}/cover-192x192.webp`}
            srcSet={`
              ${import.meta.env.BASE_URL}songs/${props.directory}/cover-64x64.webp   64w,
              ${import.meta.env.BASE_URL}songs/${props.directory}/cover-128x128.webp 128w,
              ${import.meta.env.BASE_URL}songs/${props.directory}/cover-192x192.webp 192w`}
            alt={`${props.title} cover`}
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='10px'
            borderStyle='solid'
            borderWidth='thin'
            onLoad={() => setIsImageLoaded(true)}
            // [*] theme colors
            borderColor={theme.header.coverBorder}
          />
        </Skeleton>

        <Circle
          position='absolute'
          right='0'
          top='0'
          transform='translate(50%, -50%)'
          size='1em'
          padding='15px'
          fontWeight='bold'
          borderWidth='thin'
          // [*] theme colors
          backgroundColor={theme.capo.background}
          borderColor={theme.capo.border}
          color={theme.capo.text}
        >
          <Flex alignItems='end'>
            <Text fontSize='sm'>C</Text>
            <Text fontSize='xs'>{props.capo}</Text>
          </Flex>
        </Circle>

        <Flex
          position='absolute'
          right='-1.25em'
          bottom='0'
          justifyContent='center'
          alignItems='center'
          // [*] theme colors
          color={theme.header.typeTags}
          direction='column'
        >
          {props.type.map((item, index) => (
            <Fragment key={index}>
              <Tooltip label={item}>{typeToIcon[item as keyof typeof typeToIcon]}</Tooltip>
            </Fragment>
          ))}
          <Tooltip
            label={
              <Flex
                justify='center'
                alignItems='center'
                gap='5px'
                // [*] theme colors
                color={theme.header.contributors.contributor}
              >
                <PiFinnTheHumanDuotone />
                <Box as='span' fontWeight='bold'>
                  Contributors:
                </Box>
                <Box as='span'>
                  {props.contributors.length === 0
                    ? 'No Contributors'
                    : props.contributors.join(', ')}
                </Box>
              </Flex>
            }
          >
            <PiFinnTheHumanDuotone />
          </Tooltip>
        </Flex>

        <Flex
          flexDirection='column'
          top='0'
          left={['7em', '8em']}
          position='absolute'
          justifyContent='center'
          alignItems='center'
          gap='10px'
          height='100%'
        >
          <OpenPDFButton directory={props.directory} />
          <FetchLyricsButton
            available={props.lyrics}
            lyricsShown={props.lyricsShown}
            onClick={props.onToggleLyrics}
          />
        </Flex>
        <Flex
          flexDirection='column'
          top='0'
          right={['7em', '8em']}
          position='absolute'
          justifyContent='center'
          alignItems='center'
          gap='10px'
          height='100%'
        >
          {props.res.map((res, resIdx) => (
            <YoutubeButton
              key={resIdx}
              title={
                <>
                  Open in Youtube ⇒ {res.alias} by {res.author}
                </>
              }
              link={res.link}
            />
          ))}
        </Flex>
      </Box>

      <Heading
        noOfLines={1}
        as='h1'
        size={['sm', 'md']}
        mb={['5px']}
        textAlign='center'
        // [*] theme colors
        color={theme.header.title}
      >
        {props.title}
      </Heading>

      <Heading
        noOfLines={1}
        as='h2'
        size={['xs', 'sm']}
        mb={['5px']}
        fontStyle='italic'
        textAlign='center'
        // [*] theme colors
        color={theme.header.artists}
      >
        {props.artists.map((artist, index) => (
          <Fragment key={index}>
            {artist} {index < props.artists.length - 1 && ', '}
          </Fragment>
        ))}
      </Heading>
    </Flex>
  );
};
