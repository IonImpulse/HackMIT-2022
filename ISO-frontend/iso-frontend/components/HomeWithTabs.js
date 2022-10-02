import React from 'react'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native';
import SubmitRequest from '../views/SubmitRequest';
import Settings from '../views/Settings';
import MyStuff from '../views/MyStuff';
import Feed from '../views/Feed'
import Icon from 'react-native-vector-icons/FontAwesome';
import RequestDetails from '../views/RequestDetails';
import Request from './Request';

const HomeWithTabs = (props) => {
    const [tab, setTab] = useState("Home");
    const tabPressed = (tab) => {
        setTab(tab);
    }


    return (
        <SafeAreaView style={styles.biggerContainer}>
            {tab == "Home" && <Feed {...props} />}
            {tab == "Post" && <SubmitRequest />}
            {tab == "My Stuff" && <MyStuff />}
            {/* {tab == "Settings" && <RequestDetails><Request type={"ISO"} title={"Testing"} location_string={"Location"} tags={["Food"]}></Request></RequestDetails>} */}
            {tab == "Settings" && <Settings />}

            {/* End add component)*/}

            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => { tabPressed("Home") }} style={tab == "Home" ? styles.buttonPress : styles.button}>
                    <>
                        <Icon name="home" size={30} color="black" />
                        <Text>Home</Text>
                    </>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { tabPressed("Post") }} style={tab == "Post" ? styles.buttonPress : styles.button}>
                    <>
                        <Icon name="plus-square-o" size={30} color="black" />
                        <Text>Post</Text>
                    </>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { tabPressed("My Stuff") }} style={tab == "My Stuff" ? styles.buttonPress : styles.button}>
                    <>
                        <Icon name="user-o" size={30} color="black" />
                        <Text>My Stuff</Text>
                    </>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { tabPressed("Settings") }} style={tab == "Settings" ? styles.buttonPress : styles.button}>
                    <>
                        <Icon name="gear" size={30} color="black" />
                        <Text>Settings</Text>
                    </>
                </TouchableOpacity>
            </View>

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    biggerContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    tabBar: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        height: "12%",
        backgroundColor: "white",
        paddingTop: 5,
        paddingBottom: 20,
        bottom: 0,
    },
    button: {
        marginTop: "2%",
        marginBottom: "10%",
        width: "20%",
        height: "90%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        flexDirection: "column",
        paddingBottom: 6,
    },
    buttonPress: {
        marginTop: "2%",
        marginBottom: "10%",
        width: "20%",
        height: "90%",
        backgroundColor: "#A2D2FF",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        color: "white",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 6,
    },
});

export default HomeWithTabs