import React from "react";
import { ScrollView, Container, VStack, Text, Button } from "native-base";

const Home = () => {
  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
          <Content padder>
            <Text>Hello, User!</Text>
            <Text>
              “I took a deep breath and listened to the old brag of my heart: I
              am, I am, I am.” -Sylvia Plath, The Bell Jar
            </Text>
            <Button bordered small>
              <Text>Currently Reading</Text>
            </Button>
            <Button bordered small>
              <Text>Recommended</Text>
            </Button>
          </Content>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default Home;
