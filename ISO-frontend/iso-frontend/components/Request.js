import { StyleSheet, Text, View } from 'react-native';

const Request = (props) => {

  

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{props.type} {props.title}</Text>
                <Text>{props.location_string}</Text>
            </View>
            {/* <Text style={styles.content}>{props.children}</Text> */}
            <View style={styles.tags}>
            {props.tags.map((tag) =>
            <View style={styles.tagBox}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
            )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    
  },
  tagBox: {
    borderRadius: 5,
    backgroundColor: "white",
    marginRight: 5,
    marginTop: 2,
  },
  tag: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  container: {
    display: 'flex',
    width: '100%',
    height: 55,
    backgroundColor: 'lightblue',
    paddingLeft: "3%",
    paddingTop: '1%',
    paddingRight: '3%',
    borderRadius: 10,
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