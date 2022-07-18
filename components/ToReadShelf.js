import {
  ScrollView,
  Container,
  Image,
  VStack,
  Text,
  Heading,
  Pressable,
  NativeBaseProvider,
  Center,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const ToReadShelf = ({ navigation }) => {
  const [books, setBook] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchBooks = async () => {
    let isbnArr = [];
    const bookShelf = query(
      collection(db, "users", auth.currentUser.uid, "toReadBooks")
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
      <Center>
        <ScrollView>
          {books.length < 1 ? (
            isLoading ? (
              <Text>Loading</Text>
            ) : (
              <VStack space={4} alignItems="center">
                <Text>
                  Oh no! You don't have any books saved in this shelf yet.
                </Text>
              </VStack>
            )
          ) : isLoading ? (
            <Text>Loading</Text>
          ) : (
            <VStack space={4} alignItems="center">
              {books.map((book) => {
                return (
                  <Container key={book.industryIdentifiers[1].identifier}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Single Book", { book })
                      }
                    >
                      <Image
                        mb="4"
                        mt="3"
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
            </VStack>
          )}
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
};

export default ToReadShelf;
