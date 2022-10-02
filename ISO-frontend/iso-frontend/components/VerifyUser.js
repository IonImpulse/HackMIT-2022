import ImageStylePropTypes from 'deprecated-react-native-prop-types/DeprecatedImageStylePropTypes';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const VerifyUser = (props) => {
    const [code, setCode] = useState(''); 

    useEffect(() => {
        if(code.length == 6) props.updateVerificationCode(code); 
    }, [code])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Input the verification code</Text>
            <TextInput letterSpacing={6}
                keyboardType='numeric'
                placeholder='code'
                value={code}
                onChangeText={setCode}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '30%',
        width: '80%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    input: {
        height: 50,
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        fontSize: 20
    },
    title: {
        fontSize: 20,
    }
})

export default VerifyUser;