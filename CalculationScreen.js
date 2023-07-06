import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

const CalculationScreen = ({ navigation }) => {
  const [operators, setOperators] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState(null);
  const [userOperators, setUserOperators] = useState(['', '', '']);

  useEffect(() => {
    generateCalculation();
  }, []);

  const generateCalculation = () => {
    const newOperators = generateRandomOperators();
    const newNumbers = generateRandomNumbers();
    const newResult = calculateResult(newOperators, newNumbers);

    setOperators(newOperators);
    setNumbers(newNumbers);
    setResult(newResult);
    setUserOperators(['', '', '']);
  };

  const generateRandomOperators = () => {
    const availableOperators = ['+', '-', '*', '/'];
    const newOperators = [];

    for (let i = 0; i < 3; i++) {
      const randomOperatorIndex = Math.floor(Math.random() * availableOperators.length);
      newOperators.push(availableOperators[randomOperatorIndex]);
    }

    return newOperators;
  };

  const generateRandomNumbers = () => {
    const newNumbers = [];

    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 9)+1; // Generates a random number between 0 and 9
      newNumbers.push(randomNumber);
    }

    return newNumbers;
  };

  const calculateResult = (operators, numbers) => {
    let expression = '';

    for (let i = 0; i < numbers.length - 1; i++) {
      expression += numbers[i] + operators[i];
    }

    expression += numbers[numbers.length - 1];

    const result = eval(expression).toFixed(2);
    return result;
  };

  const handleUserOperatorChange = (index, operator) => {
    const newUserOperators = [...userOperators];
    newUserOperators[index] = operator;
    setUserOperators(newUserOperators);
  };

  const handleCheckResult = () => {
    const expression = numbers
      .map((number, index) => (index > 0 ? userOperators[index - 1] + number : number))
      .join('');

    const userResult = eval(expression).toFixed(2);


    if (userResult == result) {
      navigation.navigate('ResultScreen', { numbers, userOperators, result });
    } else {
      alert('Oops! Your answer is incorrect. Please try again.');
    }
  };

  const handleRefresh = () => {
    generateCalculation();
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {numbers.map((number, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginHorizontal: 5,
                  padding: 5,
                  width: 40,
                  textAlign: 'center',
                }}
                value={userOperators[index - 1]}
                onChangeText={(value) => handleUserOperatorChange(index - 1, value)}
                maxLength={1}
              />
            )}
            <Text>{number}</Text>
          </React.Fragment>
        ))}
        <Text>= </Text>
        <Text>{result}</Text>
      </View>
      <Button title="Check Result" onPress={handleCheckResult} />
      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );
};

export default withNavigation(CalculationScreen);
