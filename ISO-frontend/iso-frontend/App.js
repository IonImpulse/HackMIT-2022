import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feed from './views/Feed';
import SubmitRequest from './views/SubmitRequest';
import MyStuff from './views/MyStuff';
import Settings from './views/Settings';
import Login from './views/Login';

import HomeWithTabs from './components/HomeWithTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Feed" component={HomeWithTabs} />
        
        {/* <Stack.Screen name="MyStuff" component={MyStuff} />
        <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}