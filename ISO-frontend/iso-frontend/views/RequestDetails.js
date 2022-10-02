import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
import Header from '../components/Header';
const RequestDetails = ({route, navigation}) => {
    const [data, setData] = useState({});
    useEffect(() => {
        console.log(route.params);
        setData(route.params.data);
      }, [route.params]);


    return (
        <SafeAreaView style={styles.container}>
            <Header title="request details"/>
       
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flex: 1,
    }
});


export default RequestDetails;