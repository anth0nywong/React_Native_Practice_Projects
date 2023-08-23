import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandom(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandom(min, max, exclude);
    }
    return rndNum;
}

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandom(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guess, setGuess] = useState({
    minBoundary: 1,
    maxBoundary: 100,
  });
    const [rounds, setRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

  useEffect(() => {
      if (currentGuess == userNumber) {
        setGuess({
        minBoundary: 1,
        maxBoundary: 100,
        });
        onGameOver(rounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert(
        "Don't do it.",
        "You must give the correct direction to him",
        [{ text: "Sorry!", style: "cancel" }]
      );
      return;
      }
      
      let nextGuess = 0;
    if (direction === "lower") {
      setGuess((prevState) => {
        return {
          ...prevState,
          maxBoundary: currentGuess,
        };
      });
      
      nextGuess = generateRandom(guess.minBoundary, currentGuess, currentGuess);
    } else {
      setGuess((prevState) => {
        return {
          ...prevState,
          minBoundary: currentGuess + 1,
        };
      });
        nextGuess = generateRandom(
          currentGuess + 1,
          guess.maxBoundary,
          currentGuess
        );
      }
      setCurrentGuess(nextGuess);
      setRounds((prevGuess) => {
          return [nextGuess, ...prevGuess];
      })
    };
    
    const guessRoundListLength = rounds.length;

    let content = (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or Lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPressFunction={nextGuessHandler.bind(this, "lower")}
              >
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPressFunction={nextGuessHandler.bind(this, "higher")}
              >
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </>
    );

    if (width > 600) {
        content = (
          <>
            <View style={styles.landscapeContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPressFunction={nextGuessHandler.bind(this, "lower")}
                >
                  <Ionicons name="md-remove" size={24} color="white" />
                </PrimaryButton>
              </View>
              <NumberContainer>{currentGuess}</NumberContainer>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  onPressFunction={nextGuessHandler.bind(this, "higher")}
                >
                  <Ionicons name="md-add" size={24} color="white" />
                </PrimaryButton>
              </View>
            </View>
          </>
        );
    }

return (
  <View style={[styles.screen, { paddingVertical: width > 600 ? 10 : 40}]}>
    <Title>Opponent's guess</Title>
    {content}
    <View style={styles.listContainer}>
      <FlatList
        data={rounds}
        renderItem={(itemData) => {
          return (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  </View>
);
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    alignContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 2,
  },
  listContainer: {
    flex: 1,
    padding: 16,
    },
    landscapeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
  }
});