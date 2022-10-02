import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';

import Header from '../components/Header';
import User from '../contexts/User';
import Request from '../components/Request';

const MyStuff = (...props) => {
    const userContext = useContext(User);
    const userObject = userContext.user;
    const [posts, setPosts] = useState(posts);

    useEffect(() => {
        const postIds = userObject.posts;
        let postList = [];

        async function fn() {
            for (let uuid of postIds) {
                console.log(uuid);
                const response = await fetch(`https://isoapp.dev/api/v1/posts/single/${uuid}`);
                const json = await response.json();

                if (json.results) {
                    postList.push(json.results);
                }
                console.log(json);
            }
            setPosts(postList);
            console.log("LLLLLLLLLLLLLLLLLLLLLLLLLL");
            console.log(postList);
        }
        fn();
    }, [])


  return (
    <View style={styles.biggerContainer}>
        <Header title="My Stuff"/>
        <View style={styles.bigContainer}>
        
                <SafeAreaView style={styles.wrapper}>
                    {posts ?
                    <ScrollView style={styles.container}>
                    {posts != null &&
                    posts.map((req) => 
                        <Request key={Math.floor(Math.random() * 100000)}navigation={props.navigation} user={userObject} data={req} type={req.iso_or_osi} title={req.title} location_string={req.location_string} tags={req.tags}></Request>
                    )}
                    </ScrollView>
                    :
                    <Text>Be patient, still loading</Text>
                    } 
                </SafeAreaView>
                

    </View>

    </View>
    
  )
}

const styles = StyleSheet.create({
    wrapper:{
        width: "100%",

    },
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