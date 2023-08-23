import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../utils/color";

function PrimaryButton({children, onPressFunction, style}) {
    const pressHandler = () => {
        onPressFunction();
    }
    return (
      <View style={[styles.buttonOuterContainer, style]}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressed, styles.buttonInnerContainer]
              : styles.buttonInnerContainer
          }
          onPress={pressHandler}
          android_ripple={{ color: Colors.primary600 }}
        >
          <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </View>
    );
    
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,
    borderRadius: 28,
    overflow: "hidden"
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18
  },
  pressed: {
    opacity: 0.75,
  },
});