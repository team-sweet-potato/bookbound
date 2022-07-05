import React from "react";
import {Buttons} from "./components/Buttons";
import { StyleSheet, View, Image} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("./assets/bookboundtestlogo.png")}
      ></Image>
      <Buttons />
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
