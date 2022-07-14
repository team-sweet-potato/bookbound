import React, { useEffect, useState } from "react";
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
import IndividualSearchResult from './IndividualSearchResult';
import axios from 'axios';

const SearchResults = ({ navigation, route }) => {
  const [books, setBooks] = useState([]);
  const [numResults, setNumResults] = useState(0);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const loadMoreResults = async () => {
    if (numResults < 40) {
      const newResults = numResults + 10;
      setNumResults(newResults);
      const { data } = await axios.get(`${route.params.searchUrl}&maxResults=10&startIndex=${numResults}`);
      setBooks([...books, ...data.items]);
    }
  }

  useEffect(() => {
    setBooks(route.params.books["items"]);
    setNumResults(10);
  }, [])

  return (
    <>
      <Box
        flex={1}
        flexBasis="0"
        px={4}
        mx="auto"
        w={{ base: "100%", md: "768px", lg: "1000px", xl: "1080px" }}
      >
        <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMoreResults();
          }
        }}
        scrollEventThrottle={400}>
          {books ? books.map(book => (
            <Box key={book.id} >
              <Pressable onPress={() => navigation.navigate("Single Book", {book: book.volumeInfo})} _dark={{
                  bg: 'coolGray.800'
                }}
                paddingTop={2}
                paddingBottom={2}
                _light={{
                  bg: 'white'
                }}>
                <IndividualSearchResult book={book} />
              </Pressable>
            </Box>
          )) : <Text>No Results</Text>}
        </ScrollView>
      </Box>
    </>
  )
}

export default SearchResults;
