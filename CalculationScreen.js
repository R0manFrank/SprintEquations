import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Vibration } from "react-native";
import { withNavigation } from "react-navigation";
import Title from "./components/title";
import { Pedometer } from "expo-sensors";

const CalculationScreen = ({ navigation }) => {

  const [operators, setOperators] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState(null);
  const [userOperators, setUserOperators] = useState(["", "", ""]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const [stepCount, setStepCount] = useState(0);
  const [lastStepCount, setLastStepCount] = useState(0);

  useEffect(() => {
    generateCalculation();
    startTimer();
    startPedometer();
    return () => {
      stopTimer();
      stopPedometer();
    };
  }, []);

  const generateCalculation = () => {
    const newOperators = generateRandomOperators();
    const newNumbers = generateRandomNumbers();
    const newResult = calculateResult(newOperators, newNumbers);

    setOperators(newOperators);
    setNumbers(newNumbers);
    setResult(newResult);
    setUserOperators(["", "", ""]);
  };

  const generateRandomOperators = () => {
    const availableOperators = ["+", "-", "*", "/"];
    const newOperators = [];

    for (let i = 0; i < 3; i++) {
      const randomOperatorIndex = Math.floor(
        Math.random() * availableOperators.length
      );
      newOperators.push(availableOperators[randomOperatorIndex]);
    }

    return newOperators;
  };

  const generateRandomNumbers = () => {
    const newNumbers = [];

    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      newNumbers.push(randomNumber);
    }

    return newNumbers;
  };

  const calculateResult = (operators, numbers) => {
    let expression = "";

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
      .map((number, index) =>
        index > 0 ? userOperators[index - 1] + number : number
      )
      .join("");

    const userResult = eval(expression).toFixed(2);

    console.log(operators)

    if (userResult == result) {
      navigation.navigate("ResultScreen", { numbers, userOperators, result, elapsedTime, stepCount: stepCount - lastStepCount });
    } else {
      Vibration.vibrate(200)
      alert("Oops! Your answer is incorrect. Please try again.");
    }
  };

  const handleRefresh = () => {
    generateCalculation();
    setElapsedTime(0);
    setStepCount(0);
    clearInterval(timerRef.current);
    startTimer();
    startPedometer();
    setLastStepCount(stepCount);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.033);
    }, 33);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const startPedometer = () => {
    const updateFrequency = 100; // Update frequency in milliseconds

    Pedometer.isAvailableAsync().then((result) => {
      if (result) {
        Pedometer.watchStepCount(
          (result) => {
            setStepCount(result.steps);
          },
          updateFrequency,
          { stepCount: 0 }
        );
      } else {
        console.log("Pedometer is not available on this device.");
      }
    });
  };

  const stopPedometer = () => {
    Pedometer.stopObserving();
  };

  return (
    <View style={styles.container}>
      <Title></Title>
      <View style={styles.timer}>
        <Text style={styles.elapsedTimeText}>
          Elapsed Time: {elapsedTime.toFixed(2)} seconds
        </Text>
      </View>
      <View style={styles.calculation}>
        {numbers.map((number, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <TextInput
                style={styles.inputFields}
                value={userOperators[index - 1]}
                onChangeText={(value) =>
                  handleUserOperatorChange(index - 1, value)
                }
                maxLength={1}
              />
            )}
            <Text style={styles.number}>{number}</Text>
          </React.Fragment>
        ))}
        <Text style={styles.number}> = </Text>
        <Text style={styles.number}>{result}</Text>
      </View>
      <TouchableOpacity style={styles.resultButton} onPress={handleCheckResult}>
        <Text style={styles.buttonText}>Check Result</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(CalculationScreen);

const styles = StyleSheet.create({
  calculation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#9DD0FF",
  },

  inputFields: {
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "lightgray",
    marginHorizontal: 5,
    padding: 5,
    width: 40,
    textAlign: "center",
  },

  number: {
    fontWeight: "bold",
    fontSize: 20,
  },

  resultButton: {
    width: "20%",
    marginTop: 50,
    backgroundColor: "#81FF8D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
  },

  refreshButton: {
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

  timer: {
    marginBottom: 40,
    left: "15%",
  },

  elapsedTimeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

});
