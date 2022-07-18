import {
  ScrollView,
  Container,
  Image,
  VStack,
  Text,
  Center,
  Heading,
  Box,
  Pressable,
  NativeBaseProvider,
} from "native-base";
import LoadingAnimation from "./Loading";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import theme from "./Theme";

const ReadingShelf = ({ navigation }) => {
  const [books, setBook] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchBooks = async () => {
    let isbnArr = [];
    const bookShelf = query(
      collection(db, "users", auth.currentUser.uid, "currentlyReading")
    );
    const shelfContents = await getDocs(bookShelf);
    shelfContents.forEach((book) => {
      return isbnArr.push(book.id);
    });
    let booksArr = [];
    try {
      for (const isbn of isbnArr) {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}
              `
        );
        booksArr.push(data.items[0].volumeInfo);
      }
      setBook(booksArr);
      setLoading(false);
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

  return (
    <NativeBaseProvider>
      <Box mt={"5"} mb={"3"}>
        <Center>
          <Image
            source={require("../assets/readingLogo.png")}
            style={theme.readingLogo}
          ></Image>
        </Center>
      </Box>
      <Center>
        <ScrollView mt={"3"} contentInset={{ bottom: 100 }}>
          {books.length < 1 ? (
            isLoading ? (
              <LoadingAnimation />
            ) : (
              <VStack space={4}>
                <Text>
                  Oh no! You don't have any books saved in this shelf yet.
                </Text>
              </VStack>
            )
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            <VStack space={4}>
              <Center>
                {books.map((book) => {
                  return (
                    <Container key={book.industryIdentifiers[1].identifier}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("Single Book", { book })
                        }
                      >
                        <Image
                          mt={"3"}
                          mb={"3"}
                          source={{
                            uri:
                              book.imageLinks && book.imageLinks.thumbnail
                                ? book.imageLinks.thumbnail
                                : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                          }}
                          alt={`${book.title} book cover`}
                          size="2xl"
                          resizeMode="contain"
                        />
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("Single Book", { book })
                        }
                      >
                        <Heading>{book.title}</Heading>
                      </Pressable>
                      {book.authors && (
                        <Text>Authors: {book.authors.join(", ")}</Text>
                      )}
                    </Container>
                  );
                })}
              </Center>
            </VStack>
          )}
        </ScrollView>
        <Box style={theme.readLogo} />
      </Center>
    </NativeBaseProvider>
  );
};

export default ReadingShelf;
