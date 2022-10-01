import React from 'react'
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
const MyStuff = () => {
    


  return (
    <View style={styles.biggerContainer}>
        <View style={styles.bigContainer}>
            <Text style={styles.titleText}>My Stuff</Text>
            
                <View style={styles.container}>
                    <Text style={styles.subtitleText}>Filters: </Text>

                </View>
                <ScrollView style={styles.list}>
                    <Text>your posts will go here</Text>
                </ScrollView>
                

    </View>

    </View>
    
  )
}

const styles = StyleSheet.create({
    biggerContainer: {
        height:"100%",
        width: "100%",
        backgroundColor: "white",


    },
    bigContainer: {
        margin: 60,
    //   flexDirection: "column", 
      alignItems: "center", 

    },
    titleText: {
        fontSize: 20,
        alignSelf: "center",

    },
    container: {
        marginTop: 20,
        width: "100%",
        
        


    },
    subtitleText:{
        marginBottom: 5,
    },
    typeButton: {
        width:100,
        height:40,
        borderRadius: 10,
        backgroundColor: "orange",
        justifyContent: "center",
    },
    buttonText: {
        alignSelf: "center",
    },
    list: {
        backgroundColor: "red",
        width: "100%",
        height: "100%",

    }
    
    
});

export default MyStuff