import {
  ScrollView,
  Container,
  Image,
  VStack,
  Text,
  Heading,
  Badge,
  Icon,
  Row,
  Divider,
  Fab,
  Center,
  Box,
  Select,
  CheckIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
} from "firebase/firestore";
import { api_key } from "../apikey";

const SingleShelf = () => {
  const [shelf, setShelf] = useState([]);
  const [books, setBook] = useState([]);

  const fetchUserShelf = async () => {
    let isbnArr = [];
    const readBooksShelf = query(
      collection(db, "users", auth.currentUser.uid, "readBooks")
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
            const { data } = await axios.get(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${parseInt(
                isbn
              )}`
            );
            //return setBook((books) => [...books, data.items[0].volumeInfo]);
            booksArr.push(data.items[0].volumeInfo);
          }
          setBook(booksArr);
          console.log("booksArr", booksArr);
          console.log("BOOKS2", books);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserShelf();
    fetchBooks();
    console.log("SHELF", shelf);
    console.log("BOOKS", books);
  }, [books, shelf]);

  //useEffect(() => {
  //fetchBooks();
  //console.log("BOOKS", books);
  // }, [books, shelf]);

  /* return !shelf.length > 0 ? (
    <Text>Loading</Text>
  ) : (
    <ScrollView>
      <VStack space={4} alignItems="center">
        <Container>
          <Text>{books}</Text>
        </Container>
      </VStack>
    </ScrollView>
  ); */
  return <Text>Hello</Text>;
};

export default SingleShelf;
