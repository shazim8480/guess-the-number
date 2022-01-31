import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import Card from "../components/Card";
import Input from "../components/Input";

// make development easier, import colors //
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.gameTitle}>Start New Game!</Text>

      {/* card with input container */}
      <Card style={styles.inputContainer}>
        <Text style={styles.title}>Select a Number</Text>

        {/* input number here */}
        <Input style={styles.input} />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Reset" onPress={() => {}} color={Colors.secondary} />
          </View>
          <View style={styles.button}>
            <Button title="Confirm" onPress={() => {}} color={Colors.primary} />
          </View>
        </View>
      </Card>
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
  gameTitle: {
    fontSize: 24,
    marginVertical: 10,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
    maxWidth: "80%",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 88,
  },
});
