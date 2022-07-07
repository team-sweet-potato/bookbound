import React from "react";
import { ScrollView, Container, VStack, Text, Button, Heading, Input, Center } from "native-base";

const SearchResults = () => {
  return (
    // <ScrollView>
    <Center flex={1} px="2">
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Material</Heading>
        <Input
        placeholder="Search People Places"
        width="100%"
        borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} />
      </VStack>
    </Center>
    // </ScrollView>
  );
};

export default SearchResults;
