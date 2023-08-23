import * as React from "react";
import { StyleSheet, TextInput, View, Button, Modal, Image} from "react-native";
import { StatusBar } from "expo-status-bar";

const GoalInput = (props) => {
  const [enteredGoalText, setEnteredGoalText] = React.useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

    function addGoalHandler() {
        props.addGoalHandler(enteredGoalText);
        setEnteredGoalText('');
        props.toggleAddGoalModal();
    }

    return (
      <>
        <Modal visible={props.visible} animationType="slide">
          <StatusBar style="light" />
          <View style={style.inputContainer}>
            <Image
                source={require("../assets/images/trillium.png")}
              style={style.image}
            />
            <TextInput
              style={style.textInput}
              placeholder="your course goal!"
              value={enteredGoalText}
              onChangeText={goalInputHandler}
            />

            <View style={style.buttonContainer}>
              <View style={style.button}>
                <Button
                  title="Cancel"
                  onPress={props.toggleAddGoalModal}
                  color="#f31282"
                />
              </View>
              <View style={style.button}>
                <Button
                  title="Add Goal"
                  onPress={addGoalHandler}
                  color="#b180f0"
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
};

export default GoalInput;

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
      backgroundColor: "#e4d0ff",
      color: "#120438",
    borderRadius: 6,
    width: "80%",
    marginRight: 8,
      padding: 8,
    paddingHorizontal: 16
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "35%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
