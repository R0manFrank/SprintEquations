import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Title from './components/title';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { numbers, userOperators, result, elapsedTime, stepCount, updateHighScore, HighScoreDisplay } = route.params || {};

  const calculation = numbers.map((number, index) => {
    if (index !== numbers.length - 1) {
      return `${number} ${userOperators[index]}`;
    } else {
      return `${number} = ${result}`;
    }
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const displayStepCount = stepCount >= 0 ? stepCount : 0;

  
  const stepCountWeight = 0.1; 
  const elapsedTimeWeight = 500; 

  const stepCountScore = stepCount * stepCountWeight;
  const elapsedTimeScore = 1 / elapsedTime * elapsedTimeWeight;

  const totalScore = stepCountScore * elapsedTimeScore + elapsedTimeScore/2;

  useEffect(() => {
    updateHighScore(totalScore);
  }, [updateHighScore, totalScore]);

  return (
    <View style={styles.container}>
      <Title></Title>
      <View style={styles.result}>
        <Text style={styles.text}>Elapsed Time: {elapsedTime.toFixed(2)} {'\n'}</Text>
        <Text style={styles.text}>Steps taken: {displayStepCount} {'\n'}</Text>
        <Text style={styles.text}>Resulting Equation:</Text>
        <Text style={styles.text}>{calculation.join(' ')} {'\n'} {'\n'} {'\n'}</Text>
      </View>
      <View style={styles.result}>
        <Text style={styles.score}>Your Score</Text>
        <Text style={styles.score}>{totalScore.toFixed(0)}</Text>
      </View>
      
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.highScore}>
        <HighScoreDisplay ></HighScoreDisplay>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#9DD0FF",
  },

  backButton: {
    marginTop: 40,
    backgroundColor: "#8F8F8F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },

  result: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  score: {
    fontSize: 36,
    fontWeight: "bold",
  },  

  highScore: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "10%",
  },

});

export default ResultScreen;
