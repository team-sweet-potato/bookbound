import {
  ScrollView,
  Container,
  Image,
  VStack,
  Text,
  Heading,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const ToReadShelf = () => {
  const [shelf, setShelf] = useState([]);
  const [books, setBook] = useState([]);

  const fetchUserShelf = async () => {
    let isbnArr = [];
    const readBooksShelf = query(
      collection(db, "users", auth.currentUser.uid, "toReadBooks")
    );
    const shelfContents = await getDocs(readBooksShelf);
    if (shelf.length < 1) {
      shelfContents.forEach((book) => {
        return isbnArr.push(book.id);
      });
      return setShelf(isbnArr);
    }
  };

  const fetchBooks = async () => {
    if (shelf.length >= 1) {
      if (books.length < 1) {
        let booksArr = [];
        try {
          for (const isbn of shelf) {
            console.log("ISBN", isbn);
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
      }
    }
  };

  useEffect(() => {
    fetchUserShelf();
    fetchBooks();
  }, [books, shelf]);

  return (
    <ScrollView>
      <VStack space={4} alignItems="center">
        {books.map((book) => {
          return (
            <Container>
              <Image
                source={{
                  uri: book.imageLinks.thumbnail,
                }}
                alt={`${book.title} book cover`}
                size="2xl"
              />
              <Heading>{book.title}</Heading>
              <Text>{book.authors.join(", ")}</Text>
            </Container>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default ToReadShelf;
