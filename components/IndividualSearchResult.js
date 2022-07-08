import React from 'react'
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  Spacer,
  Text,
  VStack
} from "native-base";

const IndividualSearchResult = ({ book }) => {
  console.log(book)
  const image = book['volumeInfo']['imageLinks'] !== undefined ? book['volumeInfo']['imageLinks']['smallThumbnail'] : 'https://historyexplorer.si.edu/books/book/multicultural-portrait-immigration'
  return (
    <Box>
      <Pressable onPress={() => console.log('You touched me')} _dark={{
        bg: 'coolGray.800'
      }}
        _light={{
          bg: 'white'
        }}>
        <Box pl="4" pr="5" py="2">
          <HStack
            alignItems="center"
            space={3}>
            <Image source={{
              uri: image
            }} alt="Alternate Text" size="xl" />
            <VStack style={{ flexGrow: 1, flexDirection: 'row' }}>
              <Text
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50'
                }}
                // alignSelf='flex-start'
                bold>
                {book['volumeInfo']['title']}
              </Text>
              <Text color="coolGray.600" _dark={{
                color: 'warmGray.200'
              }}>
                recent text
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800" _dark={{
              color: 'warmGray.50'
            }} alignSelf="flex-start">
              Add
            </Text>
          </HStack>
        </Box>
      </Pressable >
    </Box >
  )
}

export default IndividualSearchResult
