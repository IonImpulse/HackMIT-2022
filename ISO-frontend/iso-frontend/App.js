import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeWithTabs from './components/HomeWithTabs';

export default function App() {
  return (
    <View>
      <HomeWithTabs />
    </View>
  );
}