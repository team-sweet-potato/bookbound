import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Icon,
  Input,
  ScrollView,
  VStack,
  Button,
  NativeBaseProvider
} from "native-base";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { api_key } from '../apikey';
import { ImageBackground } from "react-native";
import theme from "./Theme";

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const onSubmitEditing = async (event) => {
    // This function will submit the text to be searched to the Books API
    const searchQuery = search.replace(/ /g, '+')
    const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`)
    navigation.navigate("Search Results", {
      books: data,
      searchUrl: `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
    })
  }

  return (
    <NativeBaseProvider>
    <ScrollView>
      <Box safeArea>
        <Center
          flex={1}
          px="2">
          <VStack
            w="100%"
            space={5}
            alignSelf="center">
            {/* <Heading fontSize="lg">Material</Heading> */}
            <Input
              placeholder="Search Books"
              width="100%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}
              InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<FontAwesome name="barcode" size={24} color="black" />} />}
              returnKeyType="done"
              onSubmitEditing={onSubmitEditing}
              onChangeText={text => setSearch(text)} />
          </VStack>
        </Center>
      </Box>
      <Box>
        <Button onPress={() => navigation.navigate("Scanner")}>Scan Barcode</Button>
      </Box>
    </ScrollView >
        <ImageBackground
        source={require("../assets/morepastelbooks.png")}
        alt="books"
        style={theme.homeBooks}
      ></ImageBackground>
      </NativeBaseProvider>
  );
};

export default Search;
