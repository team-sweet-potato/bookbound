import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";
import UserProfile from "./UserProfile";

const UsersShelves = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <UserProfile/>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default UsersShelves;
