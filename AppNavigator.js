import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalculationScreen from './CalculationScreen';
import ResultScreen from './ResultScreen';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [highScore, setHighScore] = useState(0);

  const updateHighScore = (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  const HighScoreDisplay = () => {
    return <View style={styles.highScoreView}><Text style={styles.highScore}>Your previous Highscore: {highScore.toFixed(0)}</Text></View>;
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="CalculationScreen">
        <Stack.Screen name="CalculationScreen" component={CalculationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} initialParams={{ updateHighScore, HighScoreDisplay }} />
      </Stack.Navigator>
    </View>
  );
};

const styles=StyleSheet.create({
  highScoreView: {
    alignItems: "center",
    width: "100%",
  },

  highScore: {
    fontSize: 14 ,
    fontWeight: "bold",
  },


});

export default AppNavigator;