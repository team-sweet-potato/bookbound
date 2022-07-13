import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  VStack,
  WarningOutlineIcon
} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';

const CreateAccount = ({ navigation }) => {
  // Variables to sign up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errors, setErrors] = useState({email: "", password: "", firstName: "", lastName: "", username: ""});

  const validate = () => {
    if (email === "") {
      setErrors({...errors, email: "Please enter a valid email."});
    }
    if (password === "" || verifyPassword === "") {
      setErrors({...errors, password: "Please enter a password."});
    } else if (password !== verifyPassword) {
      setErrors({...errors, password: "Passwords do not match."});
    }
    if (firstName === "") {
      setErrors({...errors, firstName: "Please enter your first name."});
    }
    if (lastName === "") {
      setErrors({...errors, lastName: "Please enter your last name."});
    }
    if (username === "") {
      setErrors({...errors, username: "Please enter a valid username."});
    }
    if (errors.email || errors.password || errors.firstName || errors.lastName || errors.username) {
      return false
    }
    return true;
  };

  async function handleSignUp() {
    try {
      if (validate()) {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: firstName,
          lastName: lastName,
          username: username,
        });
        navigation.push("Nav Bar");
      }
    } catch (error) {
      Alert.alert("Sign up failed", "Please try again.");
    }
  }

  return (
    <KeyboardAwareScrollView>
      <Box safeAreaTop="20" alignItems="center">
        <Image
          source={require("../assets/bookboundtestlogo.png")}
          alt="bookbound logo"
          justifyContent="center"
          alignItems="center"
          width="200"
          height="100"
        ></Image>
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
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Create an account to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl isRequired isInvalid={!!errors.firstName}>
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  value={firstName}
                  placeholder="firstName"
                  onChangeText={(text) => {
                    setFirstName(text)
                    setErrors({...errors, firstName: ""})
                  }}
                />
                {errors.firstName && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.firstName}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.lastName}>
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  value={lastName}
                  placeholder="lastName"
                  onChangeText={(text) => {
                    setLastName(text)
                    setErrors({...errors, lastName: ""})
                  }}
                />
                {errors.lastName && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.lastName}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.username}>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  value={username}
                  placeholder="username"
                  onChangeText={(text) => {
                    setUsername(text)
                    setErrors({...errors, username: ""})
                  }}
                />
                {errors.username && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.username}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.email}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  placeholder="email"
                  onChangeText={(text) => {
                    setEmail(text)
                    setErrors({...errors, email: ""})
                  }}
                />
                {errors.email && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.email}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.password}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={password}
                  placeholder="password"
                  onChangeText={(text) => {
                    setPassword(text)
                    setErrors({...errors, password: ""})
                  }}
                  secureTextEntry
                />
                {errors.password && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.password}</FormControl.ErrorMessage>}
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.password}>
                <FormControl.Label>Verify Password</FormControl.Label>
                <Input
                  value={verifyPassword}
                  placeholder="password"
                  onChangeText={(text) => {
                    setVerifyPassword(text)
                    setErrors({...errors, password: ""})
                  }}
                  secureTextEntry
                />
                {errors.password && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>{errors.password}</FormControl.ErrorMessage>}
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
                Sign up
              </Button>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => navigation.goBack()}
              >
                Back to Login
              </Button>
            </VStack>
          </Box>
        </Center>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default CreateAccount;
