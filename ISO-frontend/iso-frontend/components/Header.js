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
        height: "11%",
        backgroundColor: "#FFAFCC",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 35,
        paddingBottom: 0,
    },
    title: {
        fontFamily: "Inter-Bold",
        fontSize: 30,
        fontWeight: "bold",
    }
    
});

export default Header