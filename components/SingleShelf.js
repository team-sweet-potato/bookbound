import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const SingleShelf = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <Text>Hello, User!</Text>
            <Text>
              SingleShelf Screen
            </Text>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default SingleShelf;
