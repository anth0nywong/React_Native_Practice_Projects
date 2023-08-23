import { View, StyleSheet, Image, Text, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../utils/color";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ rounds, userNumber, onStartNewGame }) => {
    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }
    if (height < 400) {
        imageSize = 80;
    }
    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    return (
        <ScrollView style={{ flex: 1} }>
        <View style={styles.rootContainer}>
          <Title>Game Over!</Title>
          <View style={styles.imageOuterContainer}>
            <View style={[styles.imageContainer, imageStyle]}>
              <Image
                source={require("../assets/images/success.png")}
                style={styles.image}
              />
            </View>
          </View>
          <Text style={styles.text}>
            Your phone need <Text style={styles.highlight}>{rounds}</Text>{" "}
            rounds to guess the number{" "}
            <Text style={styles.highlight}>{userNumber}</Text>.
          </Text>
          <PrimaryButton onPressFunction={onStartNewGame}>
            Start a new game.
          </PrimaryButton>
        </View>
      </ScrollView>
    );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOuterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  imageContainer: {
    width: deviceWidth < 380 ? 200 : 250,
    height: deviceWidth < 380 ? 200 : 250,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: deviceWidth < 380 ? 18 : 20,
    textAlign: "center",
    marginVertical: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});