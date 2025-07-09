/**
 * @format
 */

// This MUST be the first import
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// This line registers your main App component and should come AFTER all imports
AppRegistry.registerComponent(appName, () => App);