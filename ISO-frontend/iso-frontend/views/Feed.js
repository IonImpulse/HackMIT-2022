import { Text, View, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import Request from '../components/Request';

const Feed = (props) => {
    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
                <Request title="My ISO" location="MA">This is my ISO</Request>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: "lightblue"
    }
})

export default Feed;