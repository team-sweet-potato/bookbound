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
  Center,
  Box,
  Select,
  CheckIcon,
  NativeBaseProvider,
} from "native-base";
import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { SafeAreaView } from "react-native";
import theme from "./Theme";
import LottieView from "lottie-react-native";

const SingleBook = ({ route }) => {
  const [book, setBook] = useState({});
  const [list, setList] = useState("");
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState("");

  const fetchBook = async () => {
    setBook(route.params.book);
    setIsbn(
      route.params.book.industryIdentifiers.filter(
        (isbn) => isbn.type === "ISBN_10"
      )[0].identifier
    );
  };

  const fetchList = async () => {
    if (list === "") {
      const querySnapshotRead = await getDocs(
        collection(doc(db, "users", auth.currentUser.uid), "readBooks")
      );
      querySnapshotRead.forEach((doc) => {
        if (doc.id === isbn) {
          setRating(doc.data().rate);
          setList("readBooks");
        }
      });
    }

    if (list === "") {
      const querySnapshotReading = await getDocs(
        collection(doc(db, "users", auth.currentUser.uid), "currentlyReading")
      );
      querySnapshotReading.forEach((doc) => {
        if (doc.id === isbn) {
          setList("currentlyReading");
        }
      });
    }

    if (list === "") {
      const querySnapshotToRead = await getDocs(
        collection(doc(db, "users", auth.currentUser.uid), "toReadBooks")
      );
      querySnapshotToRead.forEach((doc) => {
        if (doc.id === isbn) {
          setList("toReadBooks");
        }
      });
    }
  };

  const handlePress = async (index) => {
    setRating(index);
    await updateDoc(
      doc(doc(db, "users", auth.currentUser.uid), "readBooks", isbn),
      { rate: index }
    );
    const bookCol = doc(db, "ratings", isbn);
    await setDoc(bookCol, {}, { merge: true });
    await setDoc(doc(bookCol, "userRatings", auth.currentUser.uid), {
      rate: index,
    });

    // Used to padd the beginning of the isbn
    function pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
    if (index >= 3) {
      const { data } = await axios.get(`http://localhost:8000/${book.title}`);
      const d = JSON.parse(data);
      if (d !== null) {
        let i = 0;
        let desiredQty = 5;
        while (i < desiredQty) {
          let recommendedBook = d[i]["isbn"];
          if (recommendedBook === null && i !== 9) {
            desiredQty++;
          } else {
            recommendedBook = pad(recommendedBook, 10);
            await setDoc(
              doc(
                doc(db, "users", auth.currentUser.uid),
                "recommended",
                recommendedBook
              ),
              { recommendedFor: isbn, createdOn: new Date() }
            );
          }
          i++;
        }
      }
    }
  };

  const handleValueChange = async (value) => {
    if (list !== "") {
      await deleteDoc(doc(doc(db, "users", auth.currentUser.uid), list, isbn));
    }
    if (value !== "") {
      await setDoc(
        doc(doc(db, "users", auth.currentUser.uid), value, isbn),
        {}
      );
      setList(value);
    } else {
      setList(value);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchList();
  }, [book, list]);

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 12000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        {Object.keys(book).length === 0 ? (
          <Text>Loading</Text>
        ) : (
          <ScrollView>
            <VStack space={4} alignItems="center">
              <Container>
                {list === "readBooks" && (
                  <Badge
                    backgroundColor={theme.rosey[100]}
                    rounded="full"
                    mb={-4}
                    mr={6}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    _text={{ fontSize: 12 }}
                  >
                    Read
                  </Badge>
                )}
                {list === "currentlyReading" && (
                  <Badge
                    backgroundColor={theme.ambers[400]}
                    rounded="full"
                    mb={-4}
                    mr={6}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    _text={{ fontSize: 12 }}
                  >
                    Reading
                  </Badge>
                )}
                {list === "toReadBooks" && (
                  <Badge
                    backgroundColor={theme.browns[300]}
                    rounded="full"
                    mb={-4}
                    mr={6}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    _text={{ fontSize: 12 }}
                  >
                    To Read
                  </Badge>
                )}
                <Image
                  source={{
                    uri:
                      book.imageLinks && book.imageLinks.smallThumbnail
                        ? book.imageLinks.smallThumbnail
                        : "https://historyexplorer.si.edu/sites/default/files/book-158.jpg",
                  }}
                  alt={`${book.title} book cover`}
                  size="2xl"
                  resizeMode="contain"
                />
              </Container>
              <Container>
                <Heading size="xl">{book.title}</Heading>
                {book.authors && (
                  <Heading size="md">By {book.authors.join(", ")}</Heading>
                )}
                <Divider
                  my="2"
                  _light={{
                    bg: "muted.800",
                  }}
                  _dark={{
                    bg: "muted.50",
                  }}
                />
                {book.description && (
                  <Text fontSize="sm">{book.description}</Text>
                )}
              </Container>
              {list === "readBooks" && (
                <Container>
                  <Heading size="sm">Your Rating:</Heading>
                  <Row>
                    <Icon
                      as={FontAwesome}
                      name={rating >= 1 ? "star" : "star-o"}
                      onPress={() => handlePress(1)}
                    />
                    <Icon
                      as={FontAwesome}
                      name={rating >= 2 ? "star" : "star-o"}
                      onPress={() => handlePress(2)}
                    />
                    <Icon
                      as={FontAwesome}
                      name={rating >= 3 ? "star" : "star-o"}
                      onPress={() => handlePress(3)}
                    />
                    <Icon
                      as={FontAwesome}
                      name={rating >= 4 ? "star" : "star-o"}
                      onPress={() => handlePress(4)}
                    />
                    <Icon
                      as={FontAwesome}
                      name={rating === 5 ? "star" : "star-o"}
                      onPress={() => handlePress(5)}
                    ></Icon>
                  </Row>
                </Container>
              )}
              <Center mb="20">
                <Box w="3/4" maxW="300">
                  <Select
                    selectedValue={list}
                    minWidth="200"
                    accessibilityLabel="Add to List"
                    placeholder="Add to List"
                    _selectedItem={{
                      bg: "#CE7366",
                      endIcon: <CheckIcon color="white" size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => handleValueChange(itemValue)}
                  >
                    <Select.Item label="None" value="" />
                    <Select.Item label="Read" value="readBooks" />
                    <Select.Item label="To Be Read" value="toReadBooks" />
                    <Select.Item
                      label="Currently Reading"
                      value="currentlyReading"
                    />
                  </Select>
                </Box>
              </Center>
            </VStack>
          </ScrollView>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default SingleBook;
