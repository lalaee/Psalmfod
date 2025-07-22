import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChaptersScreen from '../screens/ChaptersScreen';
import VersesScreen from '../screens/VersesScreen';
import LibraryScreen from '../screens/LibraryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const darkThemeColors = {
  header: '#121212',
  background: '#1C1C1C',
  card: '#2C2C2C',
  text: '#FFFFFF',
  inactive: 'gray',
};

// The Stack navigator for the "Psalms" tab
const PsalmsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: darkThemeColors.header },
        headerTintColor: darkThemeColors.text,
      }}
    >
      <Stack.Screen
        name="Chapters"
        component={ChaptersScreen}
        options={{
          title: 'Book of Psalms',
          headerStyle: {
            backgroundColor: '#181919', // New background color
            shadowOpacity: 0, // for iOS
            elevation: 0, // for Android
          },
          headerTitleStyle: {
            fontFamily: 'FKGroteskNeueTrial-Regular', // Custom font
            fontSize: 22, // Larger font size
          },
          // headerTintColor: '#FFFFFF' // This ensures back button is white
        }}
      />
      <Stack.Screen name="Verses" component={VersesScreen} />
    </Stack.Navigator>
  );
};

// The main Tab Navigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: darkThemeColors.text,
        tabBarInactiveTintColor: darkThemeColors.inactive,
        tabBarStyle: {
          backgroundColor: darkThemeColors.header,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Psalms"
        component={PsalmsStackNavigator}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown: true,
          title: 'Highlight Library',
          headerStyle: { backgroundColor: darkThemeColors.header },
          headerTintColor: darkThemeColors.text,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;