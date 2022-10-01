import { Text, View, StyleSheet } from 'react-native';
import Request from '../components/Request';

const Feed = (props) => {
    return (
        <View style={styles.container}>
            <Request title="My ISO" location="MA">This is my ISO</Request>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})

export default Feed;