import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  NativeBaseProvider,
  View,
  FlatList
} from "native-base";
import { SafeAreaView } from 'react-native'
import { collection, doc, query, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import axios from "axios";
import theme from "./Theme";
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Recommendations = ({ navigation }) => {
  const [currentSelect, setCurrentSelect] = useState("All Books");
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  const backgroundColors = [
    "#cb997e",
    "#ddbea9",
    "#b7b7a4",
    "#ffe8d6",
    "#b7b7a4",
    "#ddbea9",
    "#b7b7a4",
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
        data.items.length === 0 ? '' : setRecommendedBooks((prev) => [...prev, { book: data.items[0].volumeInfo, id: collection.id }]);

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
    const updateBooks = navigation.addListener("focus", () => {
      fetchAllBooks();
    });
    return updateBooks;
  }, [navigation]);

  // Components
  const Headers = () => {
    return (
      <Box>
        <Center mt="4">
          <Image
            mb="1"
            alt="recommended"
            style={theme.recLogo}
            source={require("../assets/Recommendedscript.png")}
          ></Image>
          <Image
            mt="1"
            mb="2"
            alt="recommended"
            style={theme.largeLogo}
            source={require("../assets/openbook.png")}
          ></Image>
        </Center>
        <Text fontSize="lg" fontWeight="medium" padding="3">
          Filter by Genre
        </Text>
        <View style={theme.thinLine} mt="3"></View>
        <HStack
          p="3"
          space={3}
          justifyContent="center"
          mb="2"
          mt=".5"
          paddingBottom={4}
        >
          <FlatList
            data={genres}
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  value={index}
                  onPress={() => setCurrentSelect(item)}
                >
                  {({ isPressed }) => {
                    return (
                      <Center
                        h="20"
                        w="40"
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
                        {item}
                      </Center>
                    );
                  }}
                </Pressable>
              )
            }}
            horizontal
          />
        </HStack>
      </Box>
    )
  }

  const rightSwipeActions = (progress, id) => {

    return (
      <Pressable
        onPress={async () => {
          await deleteDoc(doc(doc(db, "users", auth.currentUser.uid), "recommended", id));
          console.log(id)
          const newbooks = recommendedBooks.filter(book => book.id !== id)
          fetchAllBooks()
        }}
      >
        <View
          style={{
            backgroundColor: '#ff8303',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Center>
            <Text
              style={{
                color: '#1b1a17',
                paddingHorizontal: 10,
                fontWeight: '600',
                paddingHorizontal: 30,
                paddingVertical: 20,
                height: "100%"
              }}
            >
              Delete
            </Text>
          </Center>
        </View>
      </Pressable>
    );
  };

  const BookList = ({ bookItem }) => {
    const book = bookItem.book
    return (
      <Swipeable
        renderRightActions={(progress) => rightSwipeActions(progress, bookItem.id)}
      >
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
      </Swipeable>
    )
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={currentSelect === "All Books" ? recommendedBooks : recommendedBooks.filter(book => book.book.categories.includes(currentSelect))}
          renderItem={({ item }) => (
            <BookList bookItem={item} />
          )}
          ListHeaderComponent={Headers}
          scrollEnabled={true}
        />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Recommendations;
