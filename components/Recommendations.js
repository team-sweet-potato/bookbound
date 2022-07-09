import React, { useState } from "react";
import {
  Box,
  Center,
  Container,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack
} from "native-base";

// Create genres list using what is in the recommendations

const Recommendations = () => {
  const genres = ["Romance", "Fantasy", "Horror", "Adventure", "History"]
  const [currentSelect, setCurrentSelect] = useState("")
  return (
    <Box safeArea>
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
        <HStack p="4" space={3} justifyContent="center" mb="2" mt="1.5" >
          <Pressable  >
            {({
              isPressed
            }) => {
              return <Center h="40" w="20" bg="#cb997e" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3" backgroundColor="#cb997e" opacity={isPressed ? .5 : 1} rounded="8" style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                All Books
              </Center>
            }}
          </Pressable>
          <Pressable  >
            {({
              isPressed
            }) => {
              return <Center h="40" w="20" bg="#cb997e" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3" backgroundColor="#ddbea9" opacity={isPressed ? .5 : 1} rounded="8" style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                Sci Fi
              </Center>
            }}
          </Pressable>
          <Pressable  >
            {({
              isPressed
            }) => {
              return <Center h="40" w="20" bg="#ffe8d6" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3" backgroundColor="#ffe8d6" opacity={isPressed ? .5 : 1} rounded="8" style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                Fantasy
              </Center>
            }}
          </Pressable>
          <Pressable  >
            {({
              isPressed
            }) => {
              return <Center h="40" w="20" bg="#b7b7a4" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3" backgroundColor="#b7b7a4" opacity={isPressed ? .5 : 1} rounded="8" style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                Horror
              </Center>
            }}
          </Pressable>
          <Pressable  >
            {({
              isPressed
            }) => {
              return <Center h="40" w="20" bg="#a5a58d" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3" backgroundColor="#ddbea9" opacity={isPressed ? .5 : 1} rounded="8" style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                Adventure
              </Center>
            }}
          </Pressable>
          <Pressable  >
            {({
              isPressed
            }) => {
              return <Center h="40" w="20" bg="#6b705c" rounded="md" borderWidth="1" borderColor="coolGray.300" shadow="3" backgroundColor="#cb997e" opacity={isPressed ? .5 : 1} rounded="8" style={{
                transform: [{
                  scale: isPressed ? 0.96 : 1
                }]
              }}>
                History
              </Center>
            }}
          </Pressable>
          <Center>
          </Center>
        </HStack>
      </ScrollView>
      <ScrollView>
        <Box>
          <Text fontSize="lg" fontWeight="medium" padding="3">
            All Books
          </Text>
          <Box color="blue">
            <HStack>
              <Image
                h="70"
                source={{
                  uri: 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png'
                }} alt="Alternate Text" size="xl" />
              <VStack>
                <Text>Title</Text>
                <Text color="coolGray.600" _dark={{
                  color: 'warmGray.200'
                }}>
                  recent text
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </ScrollView>
    </Box >
  );
};

export default Recommendations;

