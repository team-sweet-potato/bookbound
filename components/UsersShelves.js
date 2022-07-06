import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const UsersShelves = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
          <Content padder>
            <Text>Hello, User!</Text>
            <Text>
              UsersShelves Screen
            </Text>
          </Content>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default UsersShelves;
