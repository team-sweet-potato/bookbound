import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const Recommendations = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
            <Text>Hello, User!</Text>
            <Text>
              Recommendations Screen
            </Text>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default Recommendations;
