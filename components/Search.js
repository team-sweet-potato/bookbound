import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const Search = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <Text>Hello, User!</Text>
            <Text>
              Search Screen
            </Text>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default Search;
