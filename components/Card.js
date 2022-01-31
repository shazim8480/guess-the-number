import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    // tip: additional styles will be overwritten with the copied card styles //
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 8,
    padding: 20,
  },
});
