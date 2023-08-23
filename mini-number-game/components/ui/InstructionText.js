
import { StyleSheet, Text } from "react-native";
import Colors from "../../utils/color";

const InstructionText = ({children, style}) => {
    return <Text style={[styles.instructionText, style]}>{children}</Text>
}
export default InstructionText

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.secondary500,
    fontSize: 18,
  },
});
