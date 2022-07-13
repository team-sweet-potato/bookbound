import React, { useState, useEffect } from "react";
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
  View
} from "native-base";
import { collection, doc, query, where, getDocs } from "firebase/firestore";
import { SafeAreaView } from 'react-native';
import { auth, db } from '../firebase';
import axios from 'axios'

const Recommendations = ({ navigation }) => {
  const [currentSelect, setCurrentSelect] = useState("All Books")
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [genres, setGenres] = useState([])

  const backgroundColors = ["#cb997e", "#ddbea9", "#ffe8d6", "#b7b7a4", "#ddbea9"]

  const fetchAllBooks = async () => {
    setRecommendedBooks([])
    setGenres(["All Books"])
    const allDocs = await getDocs(query(collection(doc(db, "users", auth.currentUser.uid), "recommended")))
    allDocs.forEach(async (collection) => {
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${collection.id}`);
      setRecommendedBooks(prev => [...prev, data.items[0].volumeInfo])

      data.items[0].volumeInfo.categories.forEach(genre => {
        setGenres(prev => [...prev, genre])
      })
    });
  }

  useEffect(() => {
    fetchAllBooks();
  }, [])

  return (
    <SafeAreaView>
      <View safeAreaView >
        <VStack alignItems="center">
          <Container>
            <Text fontSize="lg" fontWeight="medium">
              Recommended Books
            </Text>
          </Container>
        </VStack>
        <Text fontSize="lg" fontWeight="medium" padding="3">
          Filter by Genre
        </Text>
        <ScrollView horizontal={true} >
          <HStack p="4" space={3} justifyContent="center" mb="2" mt="1.5" paddingBottom={4} >
            {genres.length > 0 ?
              genres.map((genre, index) => (
                <Pressable
                  value={index}
                  onPress={() => setCurrentSelect(genre)}
                >
                  {({
                    isPressed
                  }) => {
                    return <Center h="40" w="20" bg="#cb997e" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3"
                      backgroundColor={backgroundColors[index % backgroundColors.length]}
                      opacity={isPressed ? .5 : 1} borderRadius="8" style={{
                        transform: [{
                          scale: isPressed ? 0.96 : 1
                        }]
                      }}>
                      {genre}
                    </Center>
                  }}
                </Pressable>
              ))
              :
              <></>}
          </HStack>
        </ScrollView>
        <View>
          <Text fontSize="lg" fontWeight="medium" padding="3">
            {currentSelect}
          </Text>
          <ScrollView>
            {currentSelect === "All Books" ? recommendedBooks.map(book => (
              <Box color="blue" key={book.id}>
                <Pressable
                  onPress={() => navigation.push("Single Book", { book: book })}
                >
                  <HStack>
                    <Image
                      h="70"
                      source={{
                        uri: book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
                      }} alt="Alternate Text" size="xl" />
                    <VStack
                      paddingLeft={3}
                    >
                      <Text>{book.title}</Text>
                      <Text color="coolGray.600" _dark={{
                        color: 'warmGray.200'
                      }}>
                        Authors: {book.authors.join(", ")}
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
              </Box>
            )) : recommendedBooks.filter(book => book.categories.includes(currentSelect)).map(book => (
              <Box color="blue" key={book.id}>
                <Pressable
                  onPress={() => navigation.push("Single Book", { book: book })}
                >
                  <HStack>
                    <Image
                      h="70"
                      source={{
                        uri: book.imageLinks !== undefined ? book.imageLinks.smallThumbnail : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
                      }} alt="Alternate Text" size="xl" />
                    <VStack
                      paddingLeft={3}
                    >
                      <Text>{book.title}</Text>
                      <Text color="coolGray.600" _dark={{
                        color: 'warmGray.200'
                      }}>
                        Authors: {book.authors.join(", ")}
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
              </Box>
            ))
            }

          </ScrollView>
        </View>
      </View >
    </SafeAreaView >
  );
};

export default Recommendations;

