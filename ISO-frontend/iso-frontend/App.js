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
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();


export default function App() {
  // Font load async
  const [loaded] = useFonts({
    "Inter-Bold": require('./assets/fonts/Inter-Black.ttf'),
    "Inter": require('./assets/fonts/Inter-Regular.ttf'),
    "Inter-Medium": require('./assets/fonts/Inter-Medium.ttf'),
    "Inter-SemiBold": require('./assets/fonts/Inter-SemiBold.ttf'),
    "Inter-Light": require('./assets/fonts/Inter-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {<Stack.Screen name="Signup" component={Signup} /> }
        <Stack.Screen name="Feed" component={HomeWithTabs} />
        
        <Stack.Screen name="RequestDetails" component={RequestDetails} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}