import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Center,
  Container,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  NativeBaseProvider,
} from "native-base";
import { collection, doc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import axios from "axios";
import theme from "./Theme";
import { SafeAreaView, View, Animated } from "react-native";
import LottieView from "lottie-react-native";

const Recommendations = ({ navigation }) => {
  const [currentSelect, setCurrentSelect] = useState("All Books");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  const backgroundColors = [
    "#cb997e",
    "#ddbea9",
    "#ffe8d6",
    "#b7b7a4",
    "#ddbea9",
  ];

  const fetchAllBooks = async () => {
    try {
      setRecommendedBooks([]);
      setGenres(["All Books"]);
      const allDocs = await getDocs(
        query(collection(doc(db, "users", auth.currentUser.uid), "recommended"))
      );
      const allGenres = ["All Books"];
      allDocs.forEach(async (collection) => {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${collection.id}`
        );
        setRecommendedBooks((prev) => [...prev, data.items[0].volumeInfo]);

        data.items[0].volumeInfo.categories.map((genre) => {
          if (!allGenres.includes(genre)) {
            allGenres.push(genre);
          }
        });
      });
      setGenres(allGenres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateBooks = navigation.addListener("state", () => {
      fetchAllBooks();
    });
    return updateBooks;
  }, [navigation]);

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center mt="4">
          <Image
            mb="1"
            alt="recommended"
            style={theme.recLogo}
            source={require("../assets/Recommendedscript.png")}
          ></Image>
          <Image
            mt="2"
            mb="4"
            alt="open book"
            style={theme.largeLogo}
            source={require("../assets/openbook.png")}
          ></Image>
        </Center>
        <Box safeAreaView>
          <Text fontSize="lg" fontWeight="medium" padding="3">
            Filter by Genre
          </Text>
          <ScrollView horizontal={true}>
            <HStack
              p="4"
              space={3}
              justifyContent="center"
              mb="2"
              mt="1.5"
              paddingBottom={4}
            >
              {genres.length > 0 ? (
                genres.map((genre, index) => (
                  <Pressable
                    value={index}
                    onPress={() => setCurrentSelect(genre)}
                  >
                    {({ isPressed }) => {
                      return (
                        <Center
                          h="40"
                          w="20"
                          bg="#cb997e"
                          rounded="md"
                          borderWidth="1"
                          borderColor="coolGray.300"
                          shadow="3"
                          backgroundColor={
                            backgroundColors[index % backgroundColors.length]
                          }
                          opacity={isPressed ? 0.5 : 1}
                          borderRadius="8"
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.96 : 1,
                              },
                            ],
                          }}
                        >
                          {genre}
                        </Center>
                      );
                    }}
                  </Pressable>
                ))
              ) : (
                <></>
              )}
            </HStack>
          </ScrollView>
          <View>
            <Text fontSize="lg" fontWeight="medium" padding="3">
              {currentSelect}
            </Text>
            <View style={theme.thinLine} mt="3" mb="4"></View>
            <ScrollView>
              {currentSelect === "All Books"
                ? recommendedBooks.map((book) => (
                    <Box color="blue" key={book.id} paddingBottom={5}>
                      <Pressable
                        onPress={() =>
                          navigation.push("Single Book", { book: book })
                        }
                      >
                        <HStack>
                          <Image
                            h="70"
                            source={{
                              uri:
                                book.imageLinks &&
                                book.imageLinks.smallThumbnail
                                  ? book.imageLinks.smallThumbnail
                                  : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                            }}
                            alt="Alternate Text"
                            size="xl"
                            resizeMode="contain"
                          />
                          <VStack width="70%" paddingRight={5}>
                            <Text>{book.title}</Text>
                            {book.authors && (
                              <Text
                                color="coolGray.600"
                                _dark={{
                                  color: "warmGray.200",
                                }}
                              >
                                Authors: {book.authors.join(", ")}
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                      </Pressable>
                    </Box>
                  ))
                : recommendedBooks
                    .filter((book) => book.categories.includes(currentSelect))
                    .map((book) => (
                      <Box color="blue" key={book.id} paddingBottom={5}>
                        <Pressable
                          onPress={() =>
                            navigation.push("Single Book", { book: book })
                          }
                        >
                          <HStack>
                            <Image
                              h="70"
                              source={{
                                uri:
                                  book.imageLinks &&
                                  book.imageLinks.smallThumbnail
                                    ? book.imageLinks.smallThumbnail
                                    : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                              }}
                              alt="Alternate Text"
                              size="xl"
                              resizeMode="contain"
                            />
                            <VStack width="70%" paddingRight={5}>
                              <Text>{book.title}</Text>
                              {book.authors && (
                                <Text
                                  color="coolGray.600"
                                  _dark={{
                                    color: "warmGray.200",
                                  }}
                                >
                                  Authors: {book.authors.join(", ")}
                                </Text>
                              )}
                            </VStack>
                          </HStack>
                        </Pressable>
                      </Box>
                    ))}
            </ScrollView>
          </View>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Recommendations;
