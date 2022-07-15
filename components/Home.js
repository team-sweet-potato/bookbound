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
  Stack,
} from "native-base";
import axios from "axios";
import { SafeAreaView, View, Animated, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const Home = ({ navigation }) => {
  const [current, setCurrent] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const fetchBooks = async () => {
    try {
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
    const updateBooks = navigation.addListener("focus", () => {
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
        <VStack alignItems="center">
          <Box mt="5" mb="1">
            <SafeAreaView>
              <Center>
                <View style={{ height: 50, width: 75 }}>
                  <LottieView
                    progress={progress}
                    source={require("../assets/Lottie/hello.json")}
                  />
                </View>
              </Center>
            </SafeAreaView>
          </Box>

          <SafeAreaView>
            <Container p="5">
              <View mt="2" mb="2">
                <Text>Currently Reading...</Text>
              </View>
              <VStack space={4} mt="3" mb="3">
                <SafeAreaView>
                  <HStack justifyContent="space-evenly">
                    {current &&
                      current.slice(0, 3).map((book) => (
                        <Box key={book.industryIdentifiers[1].identifier}>
                          <Pressable
                            onPress={() =>
                              navigation.navigate("Single Book", { book })
                            }
                          >
                            <Image
                              source={{
                                uri:
                                  book.imageLinks && book.imageLinks.thumbnail
                                    ? book.imageLinks.thumbnail
                                    : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
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
                    <VStack mb="1">
                      <Button
                        alignSelf={"flex-start"}
                        size="sm"
                        variant="ghost"
                        onPress={() => {
                          navigation.navigate("My Shelves", {
                            screen: "Reading",
                          });
                        }}
                      >
                        <Text fontSize="12" color={theme.rosey[300]}>
                          View All Currently Reading
                        </Text>
                      </Button>
                    </VStack>
                  ) : (
                    <SafeAreaView style={theme.thinLine}>
                      <View>
                        <Text>Add books to your Currently Reading List!</Text>
                        <Button
                          size="sm"
                          variant="ghost"
                          onPress={() => navigation.navigate("Search")}
                        >
                          <Text fontSize="12" color={theme.rosey[300]}></Text>
                        </Button>
                      </View>
                    </SafeAreaView>
                  )}
                  <View style={theme.thinLine} />
                  <SafeAreaView mb="2">
                    <Text mt="3">Recommendations</Text>
                  </SafeAreaView>
                  <SafeAreaView>
                    <HStack mt="2" justifyContent="space-evenly">
                      {recommended &&
                        recommended.slice(0, 3).map((book) => (
                          <Box key={book.industryIdentifiers[1].identifier}>
                            <Pressable
                              onPress={() =>
                                navigation.navigate("Single Book", { book })
                              }
                            >
                              <Image
                                source={{
                                  uri:
                                    book.imageLinks && book.imageLinks.thumbnail
                                      ? book.imageLinks.thumbnail
                                      : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                                }}
                                resizeMode="contain"
                                alt={`${book.title} book cover`}
                                size="xl"
                              />
                            </Pressable>
                          </Box>
                        ))}
                    </HStack>
                  </SafeAreaView>
                </SafeAreaView>
              </VStack>

              <VStack>
                {recommended.length !== 0 ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => navigation.navigate("For You")}
                  >
                    <Text fontSize="12" color={theme.rosey[300]}>
                      View All Recommended
                    </Text>
                  </Button>
                ) : (
                  <View>
                    <View>
                      <Text mt="3">
                        Add books to your 'Read' shelf and rate them to receive
                        personalized recommendations!
                      </Text>
                    </View>

                    <View style={theme.thinLine}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onPress={() => navigation.navigate("Search")}
                      >
                        <Text fontSize="12" color={theme.rosey[300]}>
                          Search for Books
                        </Text>
                      </Button>
                    </View>
                  </View>
                )}
              </VStack>
            </Container>
          </SafeAreaView>
        </VStack>
      </ScrollView>

      <ImageBackground
        source={require("../assets/morepastelbooks.png")}
        alt="books"
        style={theme.homeBooks}
      ></ImageBackground>
    </NativeBaseProvider>
  );
};

export default Home;
