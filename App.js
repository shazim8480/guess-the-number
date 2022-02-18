import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";

import * as Font from "expo-font";

import AppLoading from "expo-app-loading";

// load font///
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};

import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  // when the START GAME BUTTON is clicked, the number(input) is saved in this userNumber State//
  const [userNumber, setUserNumber] = useState();

  // state for how much round took the computer to guess the correct num//
  // initial will be 0//
  const [guessRounds, setGuessRounds] = useState(0);

  // for AppLoading Component to load fonts async//
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // if the font hasn't been loaded yet, then prolong the delay until it loads//
  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  // NEW GAME Handler upon game over //
  const configureNewGameHandler = () => {
    // reset the num of rounds upon starting a new game//
    setGuessRounds(0);
    // reset the user number to false-ish value for restarting the game//
    setUserNumber(null);
  };

  // start game button handler //////////////////////////////////
  const startGameHandler = (selectedNumber) => {
    // this function is for saving the state of START GAME BUTTON//
    setUserNumber(selectedNumber);
  };

  // game over handler////
  // this function is for saving the state of GUESSING ATTEMPTS BY COMPUTER//
  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  //initial content will be StartGameScreen//
  // send props for START GAME BUTTON for this component//
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  // cond : 1 after the input of userNumber, switch to main GameScreen/////
  // cond: 2 also, if there are no guessing rounds attempted by the computer, show gameScreen//
  if (userNumber && guessRounds <= 0) {
    // gameOverHandler will be accessible from the MAIN GAME SCREEN//
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  }
  // if computer guessed, switch to gameOver Screen //
  else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        userRounds={guessRounds}
        onRestart={configureNewGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess The Number" />
      {/* //loaded conditionally// */}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
