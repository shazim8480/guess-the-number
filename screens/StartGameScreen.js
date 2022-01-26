import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game Screen!</Text>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});
