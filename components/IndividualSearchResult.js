import React from 'react'
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Pressable,
  Spacer,
  Text,
  View,
  VStack
} from "native-base";

const IndividualSearchResult = ({ book }) => {
  const image = book['volumeInfo']['imageLinks'] !== undefined ? book['volumeInfo']['imageLinks']['smallThumbnail'] : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg"
  console.log(book)
  return (
    <Box >
      <Pressable onPress={() => console.log('You touched me')} _dark={{
        bg: 'coolGray.800'
      }}
        paddingTop={2}
        paddingBottom={2}
        _light={{
          bg: 'white'
        }}>
        <HStack
          alignItems="center"
        // width="100%"
        >
          <Image source={{
            uri: image
          }}
            width="20%"
            alt="Alternate Text"
            size="xl"

          />

          <VStack
            paddingRight={4}
            paddingLeft={3}
            width="70%"
            style={{ flexDirection: 'row', textAlignVertical: 'top' }}>
            <Text
              // style={{ textAlignVertical: 'top'  }}
              // width={20}
              style={{ justifyContent: 'flex-start', flexWrap: 'wrap', }}>
              <View>
                <Text style={{ textAlignVertical: 'top' }} bold>{book['volumeInfo']['title']}</Text>
              </View>
              <View>
                {book['volumeInfo']["authors"] ? (
                  <Text>
                    Authors: {book['volumeInfo']["authors"].join(", ")}
                  </Text>
                  ) : (
                  <Text></Text>
                )}
              </View>
              <View>
                {book['volumeInfo']["publishedDate"] ? (
                  <Text>
                    Publish Date: {book['volumeInfo']["publishedDate"]}
                  </Text>
                  ) : (
                  <Text></Text>
                )}
              </View>
            </Text>
          </VStack>
        </HStack>
      </Pressable >
    </Box >
  )
}

export default IndividualSearchResult

