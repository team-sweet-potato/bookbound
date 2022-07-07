import { ScrollView, Container, Image, VStack, Text, Heading, Badge, Icon, Row, Divider, Fab } from "native-base";
import React, { useEffect, useState } from "react";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';


const SingleBook = ({ route }) => {
  const [book, setBook] = useState({});

  const fetchBook = async () => {
    try  {
      // const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${route.params.isbn}`);
      const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:9781250313218`);
      console.log('data', data)
      setBook(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [])

  return (
    !book.items ? (<Text>Loading</Text>) : (
    <ScrollView>
      <VStack space={4} alignItems="center">
        <Container>
          <Badge
            colorScheme="success" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
            fontSize: 12
          }}>
            Read
          </Badge>
          <Image source={{
          uri: book.items[0].volumeInfo.imageLinks.thumbnail
          }} alt={`${book.items[0].volumeInfo.title} book cover`} size="2xl" />
        </Container>
        <Container>
          <Heading size="xl">{book.items[0].volumeInfo.title}</Heading>
          <Heading size="md">By {book.items[0].volumeInfo.authors.join(", ")}</Heading>
          <Divider my="2" _light={{
              bg: "muted.800"
            }} _dark={{
              bg: "muted.50"
            }} />
          <Text fontSize="sm">{book.items[0].volumeInfo.description}</Text>
        </Container>
        <Container>
          <Heading size="sm">Your Rating:</Heading>
          <Row>
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star" />
            <Icon as={FontAwesome} name="star-o" />
          </Row>
        </Container>
        <Fab renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
      </VStack>
    </ScrollView>)
  )
}

export default SingleBook;
