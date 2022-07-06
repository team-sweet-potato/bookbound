import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const Search = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
          <Content padder>
            <Text>Hello, User!</Text>
            <Text>
              Search Screen
            </Text>
          </Content>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default Search;
