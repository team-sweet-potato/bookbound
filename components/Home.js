import React, { useState, useEffect, useRef } from "react";
import theme from "./Theme.js";
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
  Center,
  HStack,
  Pressable,
  Flex,
  Stack
} from "native-base";
import axios from "axios";
import { SafeAreaView, View, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const Home = ({ navigation }) => {
  const [current, setCurrent] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const fetchBooks = async () => {
    try {
      // fetch current
      let curIsbnArr = [];
      const curBookShelf = query(
        collection(db, "users", auth.currentUser.uid, "currentlyReading")
      );
      const curShelfContents = await getDocs(curBookShelf);
      curShelfContents.forEach((book) => {
        return curIsbnArr.push(book.id);
      });
      let curBooksArr = [];
      for (const isbn of curIsbnArr) {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        curBooksArr.push(data.items[0].volumeInfo);
      }
      setCurrent(curBooksArr);

      // fetch recommended
      let recIsbnArr = [];
      const recBookShelf = query(
        collection(db, "users", auth.currentUser.uid, "recommended")
      );
      const recShelfContents = await getDocs(recBookShelf);
      recShelfContents.forEach((book) => {
        return recIsbnArr.push(book.id);
      });
      let recBooksArr = [];
      for (const isbn of recIsbnArr) {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        recBooksArr.push(data.items[0].volumeInfo);
      }
      setRecommended(recBooksArr);


    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const updateBooks = navigation.addListener('focus', () => {
      fetchBooks();
    });
    return updateBooks;
  }, [navigation]);

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      duration: 12000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <ScrollView>
        <Center>
          <VStack alignItems="center">
            <Center>
              <Container mt="10">
                <Image
                  source={require("../assets/logo.png")}
                  style={theme.loginLogo}
                  alt="bookbound logo"
                ></Image>
              </Container>
            </Center>
            <Box mt="10">
              <SafeAreaView>
                <Center>
                  <View style={{ height: 75, width: 100 }}>
                    <LottieView
                      progress={progress}
                      source={require("../assets/Lottie/hello.json")}
                    />
                  </View>
                </Center>
              </SafeAreaView>
            </Box>
            <Image
              mt="10"
              mb="7"
              source={require("../assets/bookshelfandclock.png")}
              style={theme.clockImage}
              alt="bookbound logo"
            ></Image>
            <Container p="5">
              <VStack space={4} alignItems="center" mb="3">
                <View>
                  <Button
                    w="64"
                    h="20"
                    bgColor={theme.browns[100]}
                    rounded="md"
                    shadow={3}
                    onPress={() =>
                      navigation.navigate("My Shelves", {screen: "Reading"})
                    }
                  >
                    <Text>Currently Reading</Text>
                  </Button>
                </View>
                <HStack justifyContent="space-evenly">
                  {current && current.slice(0,3).map((book) => (
                    <Box key={book.industryIdentifiers[1].identifier}>
                      <Pressable
                        onPress={() => navigation.navigate("Single Book", {book})}>
                        <Image
                            source={{
                            uri: book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                          }}
                          resizeMode="contain"
                          alt={`${book.title} book cover`}
                          size="xl"
                        />
                      </Pressable>
                    </Box>
                  ))}
                </HStack>
                {current.length !== 0 ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => {
                      navigation.navigate("My Shelves", {screen: "Reading"})
                    }}
                  >
                    View All Currently Reading
                  </Button>
                  ) : (
                    <View>
                      <Text>
                        Add books to your Currently Reading List!
                      </Text>
                      <Button
                      size="sm"
                      variant="ghost"
                      onPress={() =>
                        navigation.navigate("Search")
                      }
                      >
                        Search for Books
                      </Button>
                    </View>
                  )}
                <View>
                  <Button
                    w="64"
                    h="20"
                    bgColor={theme.browns[100]}
                    rounded="md"
                    shadow={3}
                    onPress={() =>
                      navigation.navigate("For You")
                    }
                  >
                    <Text>Recommendations</Text>
                  </Button>
                </View>
                <HStack justifyContent="space-evenly">
                  {recommended && recommended.slice(0,3).map((book) => (
                    <Box key={book.industryIdentifiers[1].identifier}>
                      <Pressable
                        onPress={() => navigation.navigate("Single Book", {book})}>
                        <Image
                            source={{
                            uri: book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                          }}
                          resizeMode="contain"
                          alt={`${book.title} book cover`}
                          size="xl"
                        />
                      </Pressable>
                    </Box>
                  ))}
                </HStack>
                {recommended.length !== 0 ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() =>
                      navigation.navigate("For You")
                    }
                  >
                    View All Recommended
                  </Button>
                  ) : (
                    <View>
                      <Text>
                        Add books to your Read List and rate them to receive personalized recommendations!
                      </Text>
                      <Button
                      size="sm"
                      variant="ghost"
                      onPress={() =>
                        navigation.navigate("Search")
                      }
                      >
                        Search for Books
                      </Button>
                    </View>
                  )}
              </VStack>
            </Container>
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Home;
