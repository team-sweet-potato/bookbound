import React, { useEffect, useRef } from "react";
import theme from "./Theme.js";
import { Center, NativeBaseProvider } from "native-base";
import { SafeAreaView, View, Animated } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation = ({}) => {
  const progress = useRef(new Animated.Value(0)).current;

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
      speed: 1
    }).start();
  };
  useEffect(() => {
    handleLikeAnimation();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <Center>
        <SafeAreaView style={{ height: 200, width: 200 }}>
          <LottieView
            progress={progress}
            source={require("../assets/Lottie/loadingAnimation.json")}
            autoPlay
            loop
          />
        </SafeAreaView>
      </Center>
    </NativeBaseProvider>
  );
};

export default LoadingAnimation;
