import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "../constants/colors";

const NumberContainer = (props) => {
  // {props.children} allows you to receive the content passed from outside and apply inside the core component //
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.secondary,
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.secondary,
    fontSize: 20,
  },
});
