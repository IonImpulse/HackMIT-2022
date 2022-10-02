import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Feed from './views/Feed';
import SubmitRequest from './views/SubmitRequest';
import MyStuff from './views/MyStuff';
import Settings from './views/Settings';
// import Login from './views/Login';
import Signup from './views/Signup';
import RequestDetails from './views/RequestDetails';

import HomeWithTabs from './components/HomeWithTabs';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Feed" component={HomeWithTabs} />
        
        <Stack.Screen name="RequestDetails" component={RequestDetails} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}