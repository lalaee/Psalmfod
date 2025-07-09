import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChaptersScreen from '../screens/ChaptersScreen';
import VersesScreen from '../screens/VersesScreen';
import LibraryScreen from '../screens/LibraryScreen'; // Import the new screen

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Create a component for the original Stack navigation flow
const PsalmsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chapters"
        component={ChaptersScreen}
        options={{ title: 'Book of Psalms' }}
      />
      <Stack.Screen name="Verses" component={VersesScreen} />
    </Stack.Navigator>
  );
};

// 2. The main export is now the Tab Navigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header here as the Stack has its own
      }}
    >
      <Tab.Screen
        name="Psalms"
        component={PsalmsStackNavigator}
        // You can add icons here, e.g., using options={{ tabBarIcon: ... }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
            headerShown: true, // Show a header for the Library screen
            title: 'Highlight Library'
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;