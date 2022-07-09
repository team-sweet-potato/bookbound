import {
  Button,
  Container,
  ScrollView,
  Text,
  VStack
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Home = ({ navigation }) => {
  const [book, setBook] = useState({});

  const fetchTestBook = async () => {
    try {
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:9780439023481`);
      if (data) {
        setBook(data.items[0].volumeInfo);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTestBook();
  }, [])

  return (
    <ScrollView>
      <VStack alignItems="center">
        <Container>
          <Text>Hello, User!</Text>
          <Text>
            “I took a deep breath and listened to the old brag of my heart: I
            am, I am, I am.” -Sylvia Plath, The Bell Jar
          </Text>
          <Button bordered small>
            <Text>Currently Reading</Text>
          </Button>
          <Button bordered small onPress={() => navigation.navigate("Recommendations")}>
            <Text>Recommended</Text>
          </Button>
          <Button bordered small onPress={() => navigation.navigate("My Shelves", { screen: "Single Book", params: { book } })}>
            <Text>Single Book test</Text>
          </Button>
        </Container>
      </VStack>
    </ScrollView>
  );
};

export default Home;
