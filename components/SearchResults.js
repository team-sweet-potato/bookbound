import React from "react";
import {
  ArrowBackIcon,
  Box,
  Heading,
  Pressable,
  Text,
  HStack
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";


const SearchResults = ({ navigation }) => {
  return (
    <>
      <SafeAreaView>
        <Box>
          <HStack>
            <Pressable
              onPress={() => {
                navigation.pop();
              }}
              _web={{
                cursor: "pointer",
              }}
            >
              {(
                <ArrowBackIcon
                  mx={3}
                  size={5}
                />
              )}
            </Pressable>
            <Heading
              color={"gray.800"}
              _web={{ py: 2 }}
              isTruncated
              numberOfLines={1}
              flex={1}
              // @ts-ignore
              style={{ wordWrap: "normal" }}
            >
              Search Results
            </Heading>
          </HStack>
        </Box>
      </SafeAreaView>
      <Box
        flex={1}
        flexBasis="0"
        px={4}
        mx="auto"
        pt={navigation ? "70px" : 0}
        w={{ base: "100%", md: "768px", lg: "1000px", xl: "1080px" }}
      >
      </Box>
    </>
  )
}

export default SearchResults;
