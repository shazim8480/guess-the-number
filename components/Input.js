import { StyleSheet, TextInput } from "react-native";
import React from "react";

const Input = (props) => {
  // {...props} allows you to take all the props from outside custom input component//
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    marginVertical: 20,
  },
});
