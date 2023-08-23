import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/color';

const NumberContainer = ({ children }) => {
    return <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
}
export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.secondary500,
    padding: deviceWidth < 380 ? 12 : 18,
    margin: deviceWidth < 380 ? 12 : 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.secondary500,
    fontSize: deviceWidth < 380 ? 24 : 36,
    fontFamily: "open-sans-bold",
  },
});

