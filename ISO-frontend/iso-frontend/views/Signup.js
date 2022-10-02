import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Text, View, StyleSheet, TextInput, Modal, Pressable,
    TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PhoneInput from "react-native-phone-number-input";
import VerifyUser from '../components/VerifyUser';
import User from '../contexts/User';

const Signup = (props) => {
    const [phoneNumber, changePhoneNumber] = useState("");
    const [country, changeCountry] = useState("");
    const [modal, setModal] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [secondSuccess, setSecondSuccess] = useState(false);
    const [uuid, setUuid] = useState("");
    const [userObject, setUserObject] = useState({});

    const userContext = useContext(User);

    const phoneInput = useRef(null);

    async function submitData() {
        try {
            const countryCode = phoneInput.current.getCountryCode();
            console.log(phoneInput);

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
                body: JSON.stringify({phone_number: phoneNumber, country: countryCode})
            });
            
            // Get uuid from result
            let json = await response.json();
            let uuid = json.results;
            setUuid(uuid);
             
            // Enable modal window 
            setModal(true);
            console.log(json);

        } catch(error) {
            alert(`${error}`);
        }
    } 

    useEffect(() => {
        async function fn() {
            if(uuid === "") return;
            const response = await fetch('https://isoapp.dev/api/v1/users/checkVerification', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({"uuid": uuid, "code": verificationCode})
            });
            
            let json = await response.json();
            let userObject = json.results;
            
            // Save user object to LocalStorage
            try { 
                await AsyncStorage.setItem('@user_object', JSON.stringify(userObject));
            } catch {
                console.log("Error saving user data to local storage");
            }
            setModal(false); 
            console.log(userObject);
            userContext.setUser(userObject);

            props.navigation.navigate('Feed');
        }
        fn();
    }, [verificationCode]);

    return (
        <View style={{width: '100%', height: '100%'}}> 
            <Modal transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false);
            }}>
                <View style={styles.modalContent}>
                    <VerifyUser updateVerificationCode={setVerificationCode} />
                </View>
            </Modal>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Sign up ✍️</Text>
                    <PhoneInput
                        ref={phoneInput}
                        withDarkTheme
                        withShadow
                        autoFocus
                        defaultCode="US"
                        onChangeText={(text) => {
                        changePhoneNumber(text);
                        }}
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
                <Button title="Bypass login for debugging" onPress={()=>props.navigation.navigate('Feed')}/>
            </View>
        </View>
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
    },
    modalContent: {
        backgroundColor: 'translucent',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Signup;