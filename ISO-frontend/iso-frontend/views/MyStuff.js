import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';

import Header from '../components/Header';
import User from '../contexts/User';

const MyStuff = () => {
    const userContext = useContext(User);
    const userObject = userContext.user;
    const [posts, setPosts] = useState(posts);

    useEffect(() => {
        const postIds = userObject[posts];
        let postList = [];

        async function fn() {
            for (let uid in postIds) {
                const response = await fetch(`/api/v1/posts/single/${uid}`);
                const json = await response.json();

                postList.push(json.body)
            }
        }
    }, [])


  return (
    <View style={styles.biggerContainer}>
        <Header title="My Stuff"/>
        <View style={styles.bigContainer}>
            
                <View style={styles.container}>
                    <Text style={styles.subtitleText}>Filters: </Text>

                </View>
                <ScrollView style={styles.list}>
                    <Text key={0}>your posts will go here</Text>
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
        margin: 30,
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