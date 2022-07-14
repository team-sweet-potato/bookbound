import { ScrollView, Container, Image, VStack, Text, Heading, Badge, Icon, Row, Divider, Fab, Center, Box, Select, CheckIcon } from "native-base";
import React, { useEffect, useState } from "react";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { SafeAreaView } from 'react-native';


const SingleBook = ({ route }) => {
  const [book, setBook] = useState({});
  const [list, setList] = useState('');
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState('');

  const fetchBook = async () => {
    setBook(route.params.book);
    setIsbn(route.params.book.industryIdentifiers.filter(isbn => isbn.type === "ISBN_10")[0].identifier);
  }

  const fetchList = async () => {
    if (list === '') {
      const querySnapshotRead = await getDocs(collection(doc(db, "users", auth.currentUser.uid), "readBooks"));
      querySnapshotRead.forEach((doc) => {
        if (doc.id === isbn) {
          setRating(doc.data().rate)
          setList("readBooks")
        }
      });
    }

    if (list === '') {
      const querySnapshotReading = await getDocs(collection(doc(db, "users", auth.currentUser.uid), "currentlyReading"));
      querySnapshotReading.forEach((doc) => {
        if (doc.id === isbn) {
          setList("currentlyReading")
        }
      });
    }

    if (list === '') {
      const querySnapshotToRead = await getDocs(collection(doc(db, "users", auth.currentUser.uid), "toReadBooks"));
      querySnapshotToRead.forEach((doc) => {
        if (doc.id === isbn) {
          setList("toReadBooks")
        }
      });
    }
  }

  const handlePress = async (index) => {
    setRating(index);
    await updateDoc(doc(doc(db, "users", auth.currentUser.uid), "readBooks", isbn), { rate: index });
    const bookCol = doc(db, "ratings", isbn);
    await setDoc(bookCol, {}, { merge: true });
    await setDoc(doc(bookCol, "userRatings", auth.currentUser.uid), { rate: index });

    // Used to padd the beginning of the isbn
    function pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
    if (index >= 3) {
      const { data } = await axios.get(`http://localhost:8000/${book.title}`)
      const d = JSON.parse(data);
      if (d !== null) {
        let i = 0;
        let desiredQty = 5
        while (i < desiredQty) {
          let recommendedBook = d[i]["isbn"]
          if (recommendedBook === null && i !== 9) {
            desiredQty++
          } else {
            recommendedBook = pad(recommendedBook, 10)
            await setDoc(doc(doc(db, "users", auth.currentUser.uid), "recommended", recommendedBook), { recommendedFor: isbn, createdOn: new Date() });
          }
          i++;
        }
      }
    }
  }

  const handleValueChange = async (value) => {
    if (list !== "") {
      await deleteDoc(doc(doc(db, "users", auth.currentUser.uid), list, isbn));
    }
    if (value !== "") {
      await setDoc(doc(doc(db, "users", auth.currentUser.uid), value, isbn), {});
      setList(value);
    } else {
      setList(value);
    }
  }

  useEffect(() => {
    fetchBook();
    fetchList();
  }, [book, list])

  return (
    <SafeAreaView>
      {Object.keys(book).length === 0 ? (<Text>Loading</Text>) : (
        <ScrollView>
          <VStack space={4} alignItems="center">
            <Container>
              {list === "readBooks" && <Badge colorScheme="success" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{ fontSize: 12 }}>Read</Badge>}
              {list === "currentlyReading" && <Badge colorScheme="info" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{ fontSize: 12 }}>Reading</Badge>}
              {list === "toReadBooks" && <Badge colorScheme="warning" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{ fontSize: 12 }}>To Read</Badge>}
              <Image source={{
                uri: book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
              }} alt={`${book.title} book cover`} size="2xl" />
            </Container>
            <Container>
              <Heading size="xl">{book.title}</Heading>
              <Heading size="md">By {book.authors.join(", ")}</Heading>
              <Divider my="2" _light={{
                bg: "muted.800"
              }} _dark={{
                bg: "muted.50"
              }} />
              <Text fontSize="sm">{book.description}</Text>
            </Container>
            {list === "readBooks" ? (
              <Container>
                <Heading size="sm">Your Rating:</Heading>
                <Row>
                  <Icon as={FontAwesome} name={rating >= 1 ? "star" : "star-o"} onPress={() => handlePress(1)} />
                  <Icon as={FontAwesome} name={rating >= 2 ? "star" : "star-o"} onPress={() => handlePress(2)} />
                  <Icon as={FontAwesome} name={rating >= 3 ? "star" : "star-o"} onPress={() => handlePress(3)} />
                  <Icon as={FontAwesome} name={rating >= 4 ? "star" : "star-o"} onPress={() => handlePress(4)} />
                  <Icon as={FontAwesome} name={rating === 5 ? "star" : "star-o"} onPress={() => handlePress(5)} />
                </Row>
              </Container>
            ) : <Text></Text>}
            <Center>
              <Box w="3/4" maxW="300">
                <Select selectedValue={list} minWidth="200" accessibilityLabel="Add to List" placeholder="Add to List" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => handleValueChange(itemValue)}>
                  <Select.Item label="None" value="" />
                  <Select.Item label="Read" value="readBooks" />
                  <Select.Item label="To Be Read" value="toReadBooks" />
                  <Select.Item label="Currently Reading" value="currentlyReading" />
                </Select>
              </Box>
            </Center>
          </VStack>
        </ScrollView>)}
    </SafeAreaView>)
}

export default SingleBook;
