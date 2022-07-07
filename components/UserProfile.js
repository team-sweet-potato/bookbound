import React from "react";
import {
  Avatar,
  ScrollView,
  Container,
  VStack,
  Text,
  NativeBaseProvider,
  HStack,
  Box,
  Flex,
  Center,
  Button,
  Stack,
  Divider,
} from "native-base";

const UserProfile = () => {
  return (
    <NativeBaseProvider>
      <Flex direction="row-reverse">
        <Stack mb="2.5" mt="5">
          <Button size="sm" variant="outline" colorScheme="secondary">
            Log Out
          </Button>
        </Stack>
      </Flex>
      <Flex direction="row" mb="2" mt="1.5">
        <Box safeAreaTop>
          <VStack space={2.5} w="100%" px="3">
            <Avatar
              size="lg"
              source={{
                uri: "https://media.istockphoto.com/photos/man-sitting-on-sofa-reading-a-book-picture-id457207689?k=20&m=457207689&s=612x612&w=0&h=UNc95C-PqL_bXVz20Xq_c5RlIRen2RCc1avDlQKs-VA=",
              }}
            ></Avatar>
          </VStack>
        </Box>
      </Flex>
      <Container>
        <Box space={4} w="100%" px="3" padding="3">
          <Text fontSize="lg" fontWeight="medium">
            Gary the Test Guy
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            @gary_loves_books
          </Text>
          <Text fontSize="md" fontWeight="medium">
            Brooklyn, NY
          </Text>
          <Text>some more user data</Text>
        </Box>
      </Container>
      <Divider my="2" />
      <Center>
        <Text fontSize="lg" fontWeight="medium" padding="3">
          Gary's Stacks
        </Text>
      </Center>
      <ScrollView horizontal={true}>
        <HStack space={3} justifyContent="center" mb="2" mt="1.5">
          <Center h="40" w="20" bg="#cb997e" rounded="md" shadow={3}>
            Romance
          </Center>
          <Center h="40" w="20" bg="#ddbea9" rounded="md" shadow={3}>
            Sci Fi
          </Center>
          <Center h="40" w="20" bg="#ffe8d6" rounded="md" shadow={3}>
            Fantasy
          </Center>
          <Center h="40" w="20" bg="#b7b7a4" rounded="md" shadow={3}>
            Horror
          </Center>
          <Center h="40" w="20" bg="#a5a58d" rounded="md" shadow={3}>
            Adventure
          </Center>
          <Center h="40" w="20" bg="#6b705c" rounded="md" shadow={3}>
            History
          </Center>
        </HStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default UserProfile;
