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
  Input,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";

const UserProfile = ({ navigation, route }) => {
  // Variables to sign up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const fetchUser = async () => {
    setFirstName(route.params.user.firstName);
    setLastName(route.params.user.lastName);
    setUsername(route.params.user.username);
    setEmail(auth.currentUser.email);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const validate = () => {
    if (email === "") {
      setEmailError("Please enter a valid email.");
    }
    if (password !== verifyPassword) {
      setPasswordError("Passwords do not match.");
    }
    if (firstName === "") {
      setFirstNameError("Please enter your first name.");
    }
    if (lastName === "") {
      setLastNameError("Please enter your last name.");
    }
    if (username === "") {
      setUsernameError("Please enter a valid username.");
    }
    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      passwordError
    ) {
      return false;
    } else {
      return true;
    }
  };

  async function handleSignUp() {
    if (validate()) {
      try {
        await updateEmail(auth.currentUser, email);
        if (password) {
          await updatePassword(auth.currentUser, password);
        }
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: firstName,
          lastName: lastName,
          username: username,
        });
        navigation.push("All Shelves");
      } catch (error) {
        Alert.alert("Account Update Failed", "Please try again.");
      }
    }
  }

  return (
    <KeyboardAwareScrollView>
      <Box alignItems="center">
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
              <FormControl isRequired isInvalid={firstNameError}>
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  value={firstName}
                  placeholder="firstName"
                  onChangeText={(text) => {
                    setFirstName(text);
                    setFirstNameError("");
                  }}
                />
                {firstNameError && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {firstNameError}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={lastNameError}>
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  value={lastName}
                  placeholder="lastName"
                  onChangeText={(text) => {
                    setLastName(text);
                    setLastNameError("");
                  }}
                />
                {lastNameError && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {lastNameError}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={usernameError}>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  value={username}
                  placeholder="username"
                  onChangeText={(text) => {
                    setUsername(text);
                    setUsernameError("");
                  }}
                />
                {usernameError && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {usernameError}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={emailError}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  placeholder="email"
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {emailError}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={passwordError}>
                <FormControl.Label>Change Password</FormControl.Label>
                <Input
                  value={password}
                  placeholder="password"
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError("");
                  }}
                  secureTextEntry
                />
                {passwordError && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {passwordError}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={passwordError}>
                <FormControl.Label>Verify New Password</FormControl.Label>
                <Input
                  value={verifyPassword}
                  placeholder="password"
                  onChangeText={(text) => {
                    setVerifyPassword(text);
                    setPasswordError("");
                  }}
                  secureTextEntry
                />
                {passwordError && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {passwordError}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
                Update
              </Button>
            </VStack>
          </Box>
        </Center>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default UserProfile;
