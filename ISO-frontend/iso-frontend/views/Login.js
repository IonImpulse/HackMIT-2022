import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import PhoneInput from "react-native-phone-number-input";

const Login = (props) => {
    const [phoneNumber, changePhoneNumber] = useState("");
    const [country, changeCountry] = useState("");

    const submitData = () => {

    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Sign up ✍️</Text>
                <PhoneInput
                    layout="first"
                    onChangeText={(text) => {
                    changePhoneNumber(text);
                    defaultCode='US'
                    withDarkTheme
                    autoFocus
                    }}
                />
                <TextInput
                    style={styles.countryInput}
                    placeholder='Enter your country name here'
                    onChangeText={changeCountry}
                    value={country}
                />
                <Pressable
                    onPress={submitData}
                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? '#349feb'
                            : '#348feb'
                        },
                        styles.wrapperCustom]}
                ><Text style={{color: 'white'}}>Submit</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginLeft: 10,
        paddingBottom: 20,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    },
    countryInput: {
        backgroundColor: '#fff',
        height: 50,
        paddingLeft: 20
    },
    submitButton: {
        paddingTop: 40,
    },
    wrapperCustom: {
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login;