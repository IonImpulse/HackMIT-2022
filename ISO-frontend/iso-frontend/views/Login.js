import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import VerifyUser from '../components/VerifyUser';

const Modal = () => {
    return (
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <VerifyUser />
        </View>
    );
}

const Login = (props) => {
    const [phoneNumber, changePhoneNumber] = useState("");
    const [country, changeCountry] = useState("");
    const [success, setSuccess] = useState(false);

    async function submitData() {
        /*try {
            console.log(phoneNumber);

            const response = await fetch('https://isoapp.dev/api/v1/users/startVerification', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({phone_number: phoneNumber, country: "US"})
            });

            const test = await response.text();
            setSuccess(true);

            console.log(test);

        } catch(error) {
            alert("Network failure!");
        }
        */
       setSuccess(true);
       console.log(success);
    } 

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <>
            
            
            {/* <TouchableWithoutFeedback style={styles.bypassBox} onPress={() => console.log("pressed")}>
            <Text style={styles.bypass}>Bypass</Text>
        </TouchableWithoutFeedback> */}
            
        {success && <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <VerifyUser />
        </View>}
        <View style={styles.container}>
            <View>
                
                <Text style={styles.title}>Sign up ✍️</Text>
                <PhoneInput
                    withDarkTheme
                    onChangeText={(text) => {
                    changePhoneNumber(text);
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
                    
                >

                    <Text style={{color: 'white'}}>Submit</Text></Pressable>
                    <View style={styles.bypassBox}>
            <Button style={styles.bypass} onPress={() => props.navigation.navigate('Feed')} title="Tap to bypass login"/>
            </View>
            </View>
        </View>
        

        </>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    bypassBox:{

    },
    bypass: {
        // position: "absolute",
        // top: 30,
        // width: "100%",
        // height: "5%",
        // backgroundColor: "red",
    },
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