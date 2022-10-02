import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native';
import { useState } from 'react';
const isoColor = "#A2D2FF";
const osiColor = "#CDB4DB";
import { useNavigation } from '@react-navigation/native';
const Request = ({data, title, location_string, type, tags}) => {
  const navigation = useNavigation(); 
  
  // const [color, setColor] = useState(isoColor);

  // if (type == "OSI"){
  //   setColor(osiColor);
  // }
  //() => {navigation.navigate("RequestDetails", {
  //   data: data,
  // })
  

    return (
        <TouchableOpacity onPress={()=>{}} style={styles.container}>
          <View style={styles.body}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{type}</Text>
          </View>

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{title.toLowerCase()}</Text>
              <Text >location: {location_string.toLowerCase()}</Text>
            </View>
            
          </View>
          
          <View>
          <View style={styles.tags}>
            {tags.map((tag) =>
            <View style={styles.tagBox}>
              <Text style={styles.tag}>{tag.toLowerCase()}</Text>
            </View>
            )}
            
            </View>
            <TouchableOpacity style={[styles.tagBox, styles.claimBox]}>
              <Text style={[ styles.tag, styles.claimText]}>claim</Text>
            </TouchableOpacity>

            

          </View>
          

          </View>
          
            

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  claimBox: {
    borderColor: "black",
    backgroundColor: "black",
    bottom: 0,
  },
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
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A2D2FF",
    marginRight: 5,
    marginTop: 2,
    position: "absolute",
    right: 0,
    borderWidth: 1.5,
    borderColor: "white",

  },
  tag: {
    color: "white",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 12,
  },
  container: {
    display: 'flex',
    width: '100%',
    height: 90,
    backgroundColor: "#A2D2FF",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: '2%',
    justifyContent: "center",
  },
  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: "100%",
  },
  title: {
    fontSize: '20pt',
    fontWeight: 'bold',
    marginBottom: 4,
  }
});

export default Request;