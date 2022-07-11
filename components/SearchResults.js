import React from "react";
import {
  ArrowBackIcon,
  Box,
  Heading,
  Pressable,
  Text,
  HStack,
  ScrollView
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import IndividualSearchResult from './IndividualSearchResult'

const SearchResults = ({ navigation, route }) => {
  const books = route.params.books["items"]
  return (
    <>
      <SafeAreaView>
        <Box>
          <HStack>
            <Pressable
              onPress={() => {
                navigation.pop();
              }}
              _web={{
                cursor: "pointer",
              }}
            >
              {(
                <ArrowBackIcon
                  mx={3}
                  size={5}
                />
              )}
            </Pressable>
            <Heading
              color={"gray.800"}
              _web={{ py: 2 }}
              isTruncated
              numberOfLines={1}
              flex={1}
            // @ts-ignore
            >
              Search Results
            </Heading>
          </HStack>
        </Box>
      </SafeAreaView>

      <Box
        flex={1}
        flexBasis="0"
        px={4}
        mx="auto"
        w={{ base: "100%", md: "768px", lg: "1000px", xl: "1080px" }}
      >
        <ScrollView>
          {books ? books.map(book => (
            <IndividualSearchResult key={book.id} book={book} />
          )) : <Text>No Results</Text>}
        </ScrollView>
      </Box>
    </>
  )
}

export default SearchResults;
