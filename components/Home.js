import {
  Button,
  Container,
  ScrollView,
  Text,
  VStack,
  Heading,
  NativeBaseProvider,
  Box,
  Image,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import theme from "./Theme.js";
import CRCard from "./CurrentlyReadingCard.js";
import RecCard from "./RecommendationsCard.js";

const Home = ({ navigation }) => {
  const [book, setBook] = useState({});

  const fetchTestBook = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:9780439023481`
      );
      if (data) {
        setBook(data.items[0].volumeInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTestBook();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <ScrollView>
        <VStack alignItems="center">
          <Container>
            <Heading size="xl" mb="4">
              <Text>Hello, User!</Text>
              <Button
                bordered
                small
                onPress={() =>
                  navigation.navigate("My Shelves", {
                    screen: "Single Book",
                    params: { book },
                  })
                }
              >
                <Text>Single Book test</Text>
              </Button>
            </Heading>
            <Text>
              “I took a deep breath and listened to the old brag of my heart: I
              am, I am, I am.” -Sylvia Plath, The Bell Jar
            </Text>
            <CRCard />
            <RecCard />
          </Container>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
