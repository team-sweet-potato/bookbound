import {
  ScrollView,
  Container,
  Image,
  VStack,
  Text,
  Heading,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const ToReadShelf = ({ navigation }) => {
  const [books, setBook] = useState([]);

  const fetchBooks = async () => {
    let isbnArr = [];
    const readBooksShelf = query(
      collection(db, "users", auth.currentUser.uid, "toReadBooks")
    );
    const shelfContents = await getDocs(readBooksShelf);
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    console.log("BOOKS", books);
  }, []);

  return (
    <ScrollView>
      {books.length < 1 ? (
        <VStack space={4} alignItems="center">
          <Text>Oh no! You don't have any books saved in this shelf yet.</Text>
        </VStack>
      ) : (
        <VStack space={4} alignItems="center">
          {books.map((book) => {
            return (
              <Container>
                <Pressable
                  onPress={() => navigation.navigate("Single Book", { book })}
                >
                  <Image
                    source={{
                      uri: book.imageLinks.thumbnail,
                    }}
                    alt={`${book.title} book cover`}
                    size="2xl"
                  />
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("Single Book", { book })}
                >
                  <Heading>{book.title}</Heading>
                </Pressable>
                <Text>{book.authors.join(", ")}</Text>
              </Container>
            );
          })}
        </VStack>
      )}
    </ScrollView>
  );
};

export default ToReadShelf;
