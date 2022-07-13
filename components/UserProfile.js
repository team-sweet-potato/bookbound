import React, { useEffect, useState } from "react";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Link,
  Image,
  Input,
  ScrollView,
  Text,
  VStack
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const UserProfile = ({ navigation, route }) => {
  // Variables to sign up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const fetchUser = async () => {
    setFirstName(route.params.user.firstName);
    setLastName(route.params.user.lastName);
    setUsername(route.params.user.username);
    setEmail(auth.currentUser.email);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  async function handleSignUp() {
    if (password === verifyPassword && firstName && lastName && username) {
      try {
        await updateEmail(auth.currentUser, email);
        await updatePassword(auth.currentUser, password);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: firstName,
          lastName: lastName,
          username: username
        });
        navigation.push("All Shelves")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <KeyboardAwareScrollView>
        <Box
          alignItems="center">
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Update Account Info
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    value={firstName}
                    placeholder="firstName"
                    onChangeText={(text) => setFirstName(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                    value={lastName}
                    placeholder="lastName"
                    onChangeText={(text) => setLastName(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    value={username}
                    placeholder="username"
                    onChangeText={(text) => setUsername(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    value={email}
                    placeholder="email"
                    onChangeText={(text) => setEmail(text)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Change Password</FormControl.Label>
                  <Input
                    value={password}
                    placeholder="password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Verify New Password</FormControl.Label>
                  <Input
                    value={verifyPassword}
                    placeholder="password"
                    onChangeText={(text) => setVerifyPassword(text)}
                    secureTextEntry
                  />
                </FormControl>
                <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
                  Submit
                </Button>
              </VStack>
            </Box>
          </Center>
        </Box>
    </KeyboardAwareScrollView>
  );
};

export default UserProfile;
