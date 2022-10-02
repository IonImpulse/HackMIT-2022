import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {
    // Attempt to fetch user object 
    useEffect(() => {
        async function fn() {
            let obj = await AsyncStorage.getItem('@user_object')
            console.log(obj);
            if (obj != null) {
                props.setUser(JSON.parse(obj));
                props.navigation.navigate('Feed');
            }
            else {
                props.navigation.navigate('Login');
            }
        }
        fn();
    }, [])

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        width: '100%',
        height: '100%'
    }
})

export default Splash;