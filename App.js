import React from "react";
import First from "./First";
import { StyleSheet, View, Image, Box } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("./assets/bookboundtestlogo.png")}
      ></Image>
      <First />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f7",
    padding: 70,
    flex: 1,
    alignItems: "center",
  },
  tinyLogo: {
    width: 200,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
