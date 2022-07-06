import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const SingleShelf = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
          <Content padder>
            <Text>Hello, User!</Text>
            <Text>
              SingleShelf Screen
            </Text>
          </Content>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default SingleShelf;
