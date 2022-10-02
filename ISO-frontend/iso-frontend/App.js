import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Splash from './views/Splash';
import Signup from './views/Signup';
import RequestDetails from './views/RequestDetails';

import HomeWithTabs from './components/HomeWithTabs';
import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  
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
        <Stack.Screen name="Splash" component={(props) => <Splash {...props} user={user} setUser={setUser} />} /> 
        <Stack.Screen name="Signup" component={(props) => <Signup {...props} user={user} setUser={setUser} />} /> 
        <Stack.Screen name="Feed" component={(props) => <HomeWithTabs {...props} user={user} setUser={setUser} />} />
        
        <Stack.Screen name="RequestDetails" component={(props) => <RequestDetails {...props} user={user} setUser={setUser} />} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}