import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Title from './components/title';
import { useNavigation } from '@react-navigation/native';

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { numbers, userOperators, result, elapsedTime, stepCount} = route.params || {};

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

  return (
    <View style={styles.container}>
      <Title></Title>
      <View style={result}>
        <Text style={styles.text}>Elapsed Time: {elapsedTime.toFixed(2)} {'\n'}</Text>
        <Text style={styles.text}>Steps taken: {displayStepCount} {'\n'}</Text>
        <Text style={styles.text}>Resulting Equation:</Text>
        <Text style={styles.text}>{calculation.join(' ')}</Text>
      </View>
      
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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

});

export default ResultScreen;
