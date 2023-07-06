import React from 'react';
import { View, Text } from 'react-native';

const ResultScreen = ({ route }) => {
  const { numbers, userOperators, result } = route.params || {};

  const calculation = numbers.map((number, index) => {
    if (index !== numbers.length - 1) {
      return `${number} ${userOperators[index]}`;
    } else {
      return `${number} = ${result}`;
    }
  });

  return (
    <View>
      <Text>Calculation:</Text>
      <Text>{calculation.join(' ')}</Text>
    </View>
  );
};

export default ResultScreen;
