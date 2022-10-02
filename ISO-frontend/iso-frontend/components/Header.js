import React from 'react'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
import SubmitRequest from '../views/SubmitRequest';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({title}) => {

  return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>

    
  )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "10%",
        backgroundColor: "#FFAFCC",
        justifyContent: "center",
        alignItems: "center",
        
    },
    title: {
        fontSize: 20,
    }
    
});

export default Header