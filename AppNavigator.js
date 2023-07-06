import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalculationScreen from './CalculationScreen';
import ResultScreen from './ResultScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CalculationScreen">
      <Stack.Screen name="CalculationScreen" component={CalculationScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;