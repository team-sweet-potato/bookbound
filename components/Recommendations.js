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
  View,
  SwipeListView,
  Avatar
} from "native-base";
import { collection, doc, query, where, getDocs } from "firebase/firestore";
import { SafeAreaView, SwipeableListView } from 'react-native';
import { auth, db } from '../firebase';
import axios from 'axios'

const Recommendations = ({ navigation }) => {
  const [currentSelect, setCurrentSelect] = useState("All Books")
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [genres, setGenres] = useState([])

  const backgroundColors = ["#cb997e", "#ddbea9", "#ffe8d6", "#b7b7a4", "#ddbea9"]

  const fetchAllBooks = async () => {
    try {
      setRecommendedBooks([])
      setGenres(["All Books"])
      const allDocs = await getDocs(query(collection(doc(db, "users", auth.currentUser.uid), "recommended")))
      const allGenres = ["All Books"]
      allDocs.forEach(async (collection) => {
        const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${collection.id}`);
        setRecommendedBooks(prev => [...prev, data.items[0].volumeInfo])

        data.items[0].volumeInfo.categories.map(genre => {
          if (!allGenres.includes(genre)) {
            allGenres.push(genre)
          }
        })
      });
      setGenres(allGenres)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const updateBooks = navigation.addListener('state', () => {
      fetchAllBooks()
    });
    return updateBooks
  }, [navigation])

  return (
    <ScrollView>
      <Box safeAreaView >
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
                        uri: book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : 'https://historyexplorer.si.edu/sites/default/files/book-158.jpg'
                      }} alt="Alternate Text" size="xl" resizeMode="contain" />
                    <VStack
                      paddingLeft={3}
                    >
                      <Text>{book.title}</Text>
                      {book.authors && <Text color="coolGray.600" _dark={{
                        color: 'warmGray.200'
                      }}>Authors: {book.authors.join(", ")}</Text>}
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
                        uri: book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : 'https://historyexplorer.si.edu/sites/default/files/book-158.jpg'
                      }} alt="Alternate Text" size="xl" resizeMode="contain" />
                    <VStack
                      paddingLeft={3}
                    >
                      <Text>{book.title}</Text>
                      {book.authors && <Text color="coolGray.600" _dark={{
                        color: 'warmGray.200'
                      }}>Authors: {book.authors.join(", ")}</Text>}
                    </VStack>
                  </HStack>
                </Pressable>
              </Box>
            ))
            }

          </ScrollView>
        </View>
      </Box >
    </ScrollView >
  );
};

export default Recommendations;

