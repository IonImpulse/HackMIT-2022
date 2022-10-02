import React from 'react'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
import SubmitRequest from '../views/SubmitRequest';
import Settings from '../views/Settings';
import MyStuff from '../views/MyStuff';
import Feed from '../views/Feed'
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeWithTabs = () => {
    const [tab, setTab] = useState("Home");
    const tabPressed = (tab) => {
        setTab(tab);
        console.log(tab);

    }
  return (
        <SafeAreaView style={styles.biggerContainer}>
            {tab == "Home" && <Feed />}
            {tab == "Post" && <SubmitRequest/>}
            {tab == "My Stuff" && <MyStuff />}
            {tab == "Settings" && <Settings />}
            
            {/* End add component)*/}

            <View style={styles.tabBar}>
                <TouchableHighlight onPress={()=> {tabPressed("Home")}} style={styles.button}>
                    <>
                    <Icon name="home" size={30} color="black" />
                    <Text>Home</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight onPress={()=> {tabPressed("Post")}} style={styles.button}>
                    <>
                    <Icon name="plus-square-o" size={30} color="black" />
                    <Text>Post</Text>
                    </>
                </TouchableHighlight>
                    
                <TouchableHighlight onPress={()=> {tabPressed("My Stuff")}} style={styles.button}>
                    <>
                    <Icon name="user-o" size={28} color="black" />
                    <Text>My Stuff</Text>
                    </>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=> {tabPressed("Settings")}} style={styles.button}>
                    <>
                    <Icon name="gear" size={30} color="black" />
                    <Text>Settings</Text>
                    </>
                </TouchableHighlight>
            </View>

        </SafeAreaView>

    
  )
}

const styles = StyleSheet.create({
    biggerContainer: {
        height:"100%",
        width: "100%",
        justifyContent: "center",

    },
    tabBar: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        height: "10%",
        backgroundColor: "white",
        bottom: 0,
    },
    button: {
        marginTop: "2%",
        marginBottom: "2%",
        // height: "30%",
        // width: "20%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
    }
});

export default HomeWithTabs