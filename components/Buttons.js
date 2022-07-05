import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export const Buttons = () => {
  return (
    <View>
      <View style={styles.parent}>
        <TouchableOpacity style={styles.roundButton1}>
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton1}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "#f2e9e4",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Cochin",
    fontSize: 15,
    fontWeight: "bold",
  },
  roundButton1: {
    width: "40%",
    height: 40,
    borderColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#bc6c25",
    alignSelf: "flex-end",
    bottom: 70,
  },
});
