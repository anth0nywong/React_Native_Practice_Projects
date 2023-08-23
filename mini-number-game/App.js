import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient} from 'expo-linear-gradient'
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import  AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOver';
import Colors from './utils/color';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [rounds, setRounds] = useState(0);

  function pickedNumberHandler(picketedNumber) {
    setUserNumber(picketedNumber);
  }

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })

  function startNewGameHandler() {
    setUserNumber(null);
    setGameIsOver(false);
    setRounds(0);
  }

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverFunction} />
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
        rounds={rounds}
      />
    );
  }

  function gameOverFunction(numberOfRounds) {
    setGameIsOver(true);
    setRounds(numberOfRounds);
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.secondary500]} style={styles.rootScreen}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("./assets/images/bg-img.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
