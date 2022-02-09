import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  // exclude number is the input number by the user// computer will take hints and guess between minimum and maximum
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min));

  if (randomNum === exclude) {
    //  if randomNum is generated as the exclude number, which is the input of the user;; then again generate number through recursion//////
    return generateRandomBetween(min, max, exclude); //recursion
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
    // props.userChoice = excluded number //
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <Button title="LOWER" />
        <Button title="HIGHER" />
      </Card>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
