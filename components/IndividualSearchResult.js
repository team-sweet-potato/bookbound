import React from "react";
import {
  ArrowBackIcon,
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  Image,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  View,
  VStack,
} from "native-base";

const IndividualSearchResult = ({ book }) => {
  const image =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
      ? book.volumeInfo.imageLinks.smallThumbnail
      : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg";
  return (
    <NativeBaseProvider>
      <HStack alignItems="center" width="100%">
        <Image
          mb="4"
          mt="3"
          source={{
            uri: image,
          }}
          width="20%"
          alt={`${book.volumeInfo.title} book cover`}
          size="xl"
          resizeMode="contain"
        />

        <VStack
          paddingRight={7}
          paddingLeft={3}
          width="70%"
          style={{ flexDirection: "row", textAlignVertical: "top" }}
        >
          <Container>
            <ScrollView>
              <Text style={{ justifyContent: "flex-start", flexWrap: "wrap" }}>
                <View>
                  <Text style={{ textAlignVertical: "top" }} bold>
                    {book.volumeInfo.title}
                  </Text>
                </View>
                <View>
                  {book.volumeInfo.authors && (
                    <Text>Authors: {book.volumeInfo.authors.join(", ")}</Text>
                  )}
                </View>
                <View>
                  {book.volumeInfo.publishedDate && (
                    <Text>Publish Date: {book.volumeInfo.publishedDate}</Text>
                  )}
                </View>
              </Text>
            </ScrollView>
          </Container>
        </VStack>
      </HStack>
    </NativeBaseProvider>
  );
};

export default IndividualSearchResult;
