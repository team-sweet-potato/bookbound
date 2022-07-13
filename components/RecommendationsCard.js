import {
  Button,
  Container,
  ScrollView,
  Text,
  VStack,
  Heading,
  NativeBaseProvider,
  Box,
  AspectRatio,
  Image,
  HStack,
  Stack,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import theme from "./Theme.js";

const RecCard = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={require("../assets/oval.png")} />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                Recommendations
              </Heading>
            </Stack>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center"></HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};
export default RecCard;
