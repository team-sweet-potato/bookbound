import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const UserProfile = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <Text>Hello, User!</Text>
            <Text>
              UserProfile Screen
            </Text>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default UserProfile;
