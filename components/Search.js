import React, { useState, useEffect, useRef, Component } from "react";
import {
  Box,
  Center,
  Icon,
  Input,
  ScrollView,
  VStack,
  Button,
  NativeBaseProvider,
  Stack,
  Text,
  Divider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { api_key } from "../apikey";
import theme from "./Theme";
import { SafeAreaView, View, Animated, ImageBackground } from "react-native";
import LottieView from "lottie-react-native";

import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Pressable } from "react-native";

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  const onSubmitEditing = async () => {
    // This function will submit the text to be searched to the Books API
    const searchQuery = search.replace(/ /g, "+");
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
    );

    await addDoc(
      collection(db, "users", auth.currentUser.uid, "searchHistory"),
      {
        search: search,
        createdOn: new Date(),
      }
    );

    setSearch("");

    navigation.navigate("Search Results", {
      books: data,
      searchUrl: `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`,
    });
  };

  const onPressHistory = async (search) => {
    const searchQuery = search.replace(/ /g, "+");
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
    );

    navigation.navigate("Search Results", {
      books: data,
      searchUrl: `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`,
    });
  };

  const fetchHistory = async () => {
    let history = [];
    const historyContents = await getDocs(
      collection(db, "users", auth.currentUser.uid, "searchHistory")
    );
    historyContents.forEach((pastSearch) => {
      return history.push(pastSearch.data());
    });
    history.sort((a, b) => b.createdOn - a.createdOn);
    setHistory(history);
  };

  const clearHistory = async () => {
    const historyContents = await getDocs(
      collection(db, "users", auth.currentUser.uid, "searchHistory")
    );
    historyContents.forEach(async (pastSearch) => {
      return await deleteDoc(
        doc(db, "users", auth.currentUser.uid, "searchHistory", pastSearch.id)
      );
    });
    setHistory([]);
  };

  useEffect(() => {
    const updateHistory = navigation.addListener("focus", () => {
      fetchHistory();
    });
    return updateHistory;
  }, [navigation]);

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const load = navigation.addListener("focus", () => {
      handleLikeAnimation();
      return load;
    });
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require("../assets/bigbookstack.png")}
        alt="books"
        style={theme.bigBookStack}
      >
        <SafeAreaView>
          <Center mt="5" mb="5">
            <View style={{ height: 75, width: 100 }}>
              <LottieView
                progress={progress}
                source={require("../assets/Lottie/lightbulb.json")}
              />
            </View>
          </Center>
        </SafeAreaView>
        <ScrollView>
          <Box safeArea>
            <Center flex={1} px="2">
              <VStack w="100%" space={5} alignSelf="center">
                <Input
                  style={theme.textInput}
                  placeholder="Search Books"
                  width="100%"
                  borderRadius="4"
                  py="3"
                  px="1"
                  fontSize="14"
                  value={search}
                  InputLeftElement={
                    <Icon
                      m="2"
                      ml="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="search" />}
                    />
                  }
                  returnKeyType="done"
                  onSubmitEditing={onSubmitEditing}
                  onChangeText={(text) => setSearch(text)}
                />
              </VStack>
            </Center>
          </Box>
          <Box pb={5} mt={5}>
            <Center>
              <Button
                borderColor={"amber.400"}
                size="sm"
                colorScheme="rose"
                style={theme.button.variants.ghost}
                variant="outline"
                width={"200"}
                height={"60"}
                borderRadius={"100"}
                mb="10"
                onPress={() => navigation.navigate("Scanner")}
              >
                <Text fontSize="14" color={theme.rosey[800]}>
                  Scan Barcode
                </Text>
              </Button>
            </Center>
          </Box>
          <Stack direction="column" divider={<Divider my="2" />}>
            {history &&
              history.length > 0 &&
              history.map((searchRes, index) => {
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    onPress={() => onPressHistory(searchRes.search)}
                  >
                    <Text>{searchRes.search}</Text>
                  </Button>
                );
              })}
          </Stack>
          {history && history.length > 0 && (
            <Button size="sm" variant="ghost" onPress={clearHistory}>
              <Text fontSize="12" color={theme.rosey[300]}>
                Clear History
              </Text>
            </Button>
          )}
        </ScrollView>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

export default Search;
