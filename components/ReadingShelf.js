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

const ReadingShelf = ({ navigation }) => {
  const [books, setBook] = useState([]);

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
              <Container key={book.industryIdentifiers[0].identifier}>
                <Pressable
                  onPress={() => navigation.navigate("Single Book", { book })}
                >
                  <Image
                    source={{
                      uri: book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
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
                {book.authors && <Text>Authors: {book.authors.join(", ")}</Text>}
              </Container>
            );
          })}
        </VStack>
      )}
    </ScrollView>
  );
};

export default ReadingShelf;
