import React, { useState, useEffect, useRef } from "react";
import theme from "./Theme.js";
import {
  Button,
  Container,
  ScrollView,
  Text,
  VStack,
  Heading,
  NativeBaseProvider,
  Box,
  Image,
  Center,
} from "native-base";
import axios from "axios";
import { SafeAreaView, View, Animated } from "react-native";
import LottieView from "lottie-react-native";

const Home = ({ navigation }) => {
  const [book, setBook] = useState({});

  const fetchTestBook = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:1408855895`
      );
      if (data) {
        setBook(data.items[0].volumeInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTestBook();
  }, []);

  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      duration: 12000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <Center>
        <VStack alignItems="center">
          <Center>
            <Container mt="10">
              <Image
                source={require("../assets/logo.png")}
                style={theme.loginLogo}
                alt="bookbound logo"
              ></Image>
            </Container>
          </Center>
          <Box mt="10">
            <SafeAreaView>
              <Center>
                <View style={{ height: 75, width: 100 }}>
                  <LottieView
                    progress={progress}
                    source={require("../assets/Lottie/hello.json")}
                  />
                </View>
              </Center>
            </SafeAreaView>
          </Box>
          <Image
            mt="10"
            mb="7"
            source={require("../assets/bookshelfandclock.png")}
            style={theme.clockImage}
            alt="bookbound logo"
          ></Image>
          <Container p="5">
            <VStack space={4} alignItems="center" mb="3">
              <View>
                <Center
                  w="64"
                  h="20"
                  bgColor={theme.browns[100]}
                  rounded="md"
                  shadow={3}
                  onPress={() =>
                    navigation.navigate("Currently Reading", {
                      screen: "ReadingShelf",
                      params: { book },
                    })
                  }
                >
                  <Text>Currently Reading</Text>
                </Center>
              </View>
              <View>
                <Button
                  w="64"
                  h="20"
                  bgColor={theme.browns[100]}
                  rounded="md"
                  shadow={3}
                  onPress={() =>
                    navigation.navigate("Recommendations", {
                      screen: "Recommendations",
                      params: { book },
                    })
                  }
                >
                  <Text>Recommendations</Text>
                </Button>
              </View>
            </VStack>
          </Container>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Home;
