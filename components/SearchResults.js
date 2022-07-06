import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const SearchResults = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <Text>Hello, User!</Text>
            <Text>
              SearchResults Screen
            </Text>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default SearchResults;
