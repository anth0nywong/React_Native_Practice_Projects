import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../utils/color";

const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer: {
        // Column
        justifyContent: "center",
        // Row
        alignItems: "center",
        borderRadius: 8,
        padding: 16,
        backgroundColor: Colors.primary800,
        // Android only
        elevation: 4,
        // IOS only
        shadowColor: "black",
        shadowOffset: { width: 8, height: 8 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
});