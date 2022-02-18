import { Button, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

import DefaultStyles from "../constants/default-style";

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

  // state for saving the rounds attempted by computer //
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // destructuring props//
  const { userChoice, onGameOver } = props;

  // game OVER / WIN Logic == when the guess matches with userInput//
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  // hints handler//
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", "This is wrong hint...", [
        {
          text: "I Understand",
          style: "cancel",
        },
      ]);
      return;
    }
    // setting the lower and higher boundary without re-rendering on every click//
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((currentRound) => currentRound + 1); // saving all the guess attempts//
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="HIGHER"
          onPress={nextGuessHandler.bind(this, "higher")}
        />
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
