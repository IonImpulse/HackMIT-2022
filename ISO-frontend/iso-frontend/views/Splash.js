import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../contexts/User';

const Splash = (props) => {
    const userContext = useContext(User);

    // Attempt to fetch user object 
    useEffect(() => {
        async function fn() {
            let obj = await AsyncStorage.getItem('@user_object')
            if (obj != null) {
                userContext.user = JSON.parse(obj);
                props.navigation.navigate('Feed');
                console.log(userContext.user);
                let res = await fetch('https://isoapp.dev/api/v1/users/userInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: obj
                });

                let json = await res.json();

                if (json.results) {
                    userContext.user = json.results;
                    await AsyncStorage.setItem('@user_object', JSON.stringify(json.results));
                    props.navigation.navigate('Feed');
                }

            }
            else {
                props.navigation.navigate('Signup');
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