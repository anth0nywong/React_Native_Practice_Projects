import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../utils/color';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';


const StartGameScreen = ({ onPickNumber }) => {
  // Even number input,the input would be a string
  const [enteredNumber, setEnteredNumber] = useState("");

  // Dynamic check
  const { width, height } = useWindowDimensions();

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  const resetNumber = () => {
    setEnteredNumber("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert...
      // Title, Message, Array of options
      Alert.alert("Invalid Number", "Please enter a nubmer between 1 and 99."),
        [{ text: "Okay", style: "destructive", onPress: resetNumber }];
      return;
    }

    onPickNumber(chosenNumber);
  };

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={styles.KeyboardAvoiding}>
      <KeyboardAvoidingView style={styles.KeyboardAvoiding} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.textInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressFunction={resetNumber}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressFunction={confirmInputHandler}>
                  Start
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

// Only executed once after the app start
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 24,
    alignItems: 'center'
  },
  textInput: {
    height: 50,
    width: 50,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: Colors.secondary500,
    borderBottomWidth: 1,
    color: Colors.secondary500,
    marginVertical: 8,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  KeyboardAvoiding: {
    flex: 1
  }
});
