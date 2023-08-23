import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/color";

const Title = ({ children }) => {
    return<Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.title500,
    textAlign: "center",
    borderWidth: 0,
    borderColor: Colors.title500,
    padding: 12,
    borderRadius: 3,
    maxWidth: "100%",
    width: 300,
    marginVertical: 10,
  },
});