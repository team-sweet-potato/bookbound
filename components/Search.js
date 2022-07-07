import React from "react";
import {
  Box,
  Center,
  Heading,
  Icon,
  Input,
  ScrollView,
  VStack,
} from "native-base";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Search = () => {
  const handleKeyPress = (event) => {
    // This function will handle saving the what will be searched
  }

  const onSubmitEditing = (event) => {
    // This function will submit the text to be searched to the Books API
    // console.log(event.nativeEvent.text)
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
              onKeyPress={handleKeyPress} />
          </VStack>
        </Center>
      </Box>
    </ScrollView>
  );
};

export default Search;
