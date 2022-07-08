import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";
import SingleShelf from "./SingleShelf";

const UsersShelves = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
          <SingleShelf />
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default UsersShelves;
