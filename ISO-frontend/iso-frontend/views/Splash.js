import { Text, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
    const [userObject, setUserObject] = useState({}); 
    
    // Attempt to fetch user object 
    useEffect(() => {
        
    }, [])

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    }
})
