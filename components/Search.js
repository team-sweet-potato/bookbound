import React, { useState } from "react";
import {
  Box,
  Center,
  Icon,
  Input,
  ScrollView,
  VStack,
} from "native-base";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Search = ({ navigation }) => {
  const [search, setSearch] = useState("")

  const onSubmitEditing = (event) => {
    // This function will submit the text to be searched to the Books API
    navigation.push("Search Results")
  }

  return (
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
    </ScrollView >
  );
};

export default Search;
