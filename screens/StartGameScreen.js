import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";

// make development easier, import colors //
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

const StartGameScreen = (props) => {
  // for validating the input and keyboard //
  const [enteredValue, setEnteredValue] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  // to have the selected number saved and be reused accordingly later//
  const [selectedNumber, setSelectedNumber] = useState(""); // for number only//

  // check the input from keyboard and set the value
  const numberInputHandler = (inputText) => {
    // replace the empty string with only numbers // only NUMBERS ARE ALLOWED TO INPUT
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  //reset handler //
  const resetInputHandler = () => {
    setEnteredValue("");
  };

  // confirmation stage //
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    // check the condition if the entered number is invalid.
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Input!", "Please choose a number between 1 and 99", [
        {
          text: "Cancel",
          onPress: resetInputHandler,
          style: "destructive",
        },
      ]);
      return; //if so, then discontinue the function//
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber); // set the number after being validated
    setEnteredValue(""); // reset the entered value upon pressing confirm BUTTON //
    Keyboard.dismiss();
  };

  // now we will show the selected number to the user visually //////////////////////////////////////////////////////////////////

  let confirmedOutput; // initial declaration , later used inside main function//

  // from "confirmed" useState/////////////////
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        {/* onStartGame props received from app.js line 18 */}
        <Button
          title="START GAME"
          color={Colors.secondary}
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
      // {selectedNumber} is passed in the NumberContainer component and all the styles are applied here through {props.children}
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); // to dismiss the keyboard on outside touch //
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.gameTitle}>Start New Game!</TitleText>

        {/* card with input container */}
        <Card style={styles.inputContainer}>
          <BodyText style={styles.title}>Select a Number</BodyText>

          {/* input number here */}
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {/* show the selected number */}
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 20,
    marginVertical: 10,
    marginBottom: 24,
  },
  title: {
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
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
