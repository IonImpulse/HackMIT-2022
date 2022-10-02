import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
const isoColor = "#A2D2FF";
const osiColor = "#CDB4DB";
const Request = (props) => {
  
  // const [color, setColor] = useState(isoColor);

  // if (props.type == "OSI"){
  //   setColor(osiColor);
  // }
  

    return (
        <View style={styles.container}>
          <View style={styles.body}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{props.type}</Text>

          </View>

          <View style={styles.header}>
              <Text style={styles.title}>{props.title}</Text>
              {/* <Text>{props.location_string}</Text> */}
          </View>

          </View>
          
            {/* <View style={styles.tags}>
            {props.tags.map((tag) =>
            <View style={styles.tagBox}>
              <Text style={styles.tag}>{tag}</Text>
            </View>
            )}
            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,

  },
  circleText:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#A2D2FF",

  },
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
    height: 80,
    backgroundColor: "#A2D2FF",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '2%',
    justifyContent: "center",
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '20pt',
    fontWeight: 'bold',
  }
});

export default Request;