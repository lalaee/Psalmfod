import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Check that '../screens/ChaptersScreen.js' exists and is named correctly.
import ChaptersScreen from '../screens/ChaptersScreen';

// Check that '../screens/VersesScreen.js' exists and is named correctly.
import VersesScreen from '../screens/VersesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Chapters">
      <Stack.Screen
        name="Chapters"
        component={ChaptersScreen}
        options={{ title: 'Book of Psalms' }}
      />
      <Stack.Screen
        name="Verses"
        component={VersesScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;