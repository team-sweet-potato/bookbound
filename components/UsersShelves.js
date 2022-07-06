import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const UsersShelves = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <Text>Hello, User!</Text>
            <Text>
              UsersShelves Screen
            </Text>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default UsersShelves;
