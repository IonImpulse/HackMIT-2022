import { StyleSheet, Text, View } from 'react-native';

const Request = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.title}</Text>
                <Text>{props.location}</Text>
            </View>
            <Text style={styles.content}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '10%',
    backgroundColor: 'lightblue',
    paddingLeft: "3%",
    paddingTop: '1%',
    paddingRight: '3%',
    borderRadius: '20%',
    marginTop: '2%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '20pt',
  }
});

export default Request;