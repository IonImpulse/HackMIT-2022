import { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const VerifyUser = () => {
    const [code, setCode] = useState('');    

    return (
        <View>
            <Text>Input the verification code</Text>
            <TextInput 
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
    },
    input: {
        height: 50,
        paddingLeft: 20,
    }
})

export default VerifyUser;