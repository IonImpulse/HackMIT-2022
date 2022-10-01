import React from 'react'
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
const Settings = () => {
    const [type, changeType] = useState(true);
    const DATA = [
        { id: 1, name: 'Food' },
        { id: 2, name: 'Electronics' },
        { id: 3, name: 'Art Supplies' },
        { id: 4, name: 'Service' },
        { id: 5, name: 'Furniture' },
        { id: 6, name: 'Stolen/Lost' },
        { id: 7, name: 'Transportation'}
    ];
    const [selectedItems, setSelectedItems] = useState([]);
    const onSelectedItemsChange = (selectedItems) => {
 
        setSelectedItems(selectedItems);
     
        for (let i = 0; i < selectedItems.length; i++) {
          var tempItem = DATA.find(item => item.id === selectedItems[i]);
          // console.log(tempItem);
        }
        console.log(selectedItems);
     
      };

  return (
    <View style={styles.biggerContainer}>
        <View style={styles.bigContainer}>
        <Text style={styles.titleText}>Settings</Text>

        <View style={styles.container}>
                <Text style={styles.subtitleText}>Tap to change theme: </Text>
                <TouchableHighlight onPress = { () => {changeType(!type)}}style={styles.typeButton}>
                    <Text style={styles.buttonText}>{type ? "Light" : "Dark"}</Text>
                </TouchableHighlight>

        </View>
        <View style={styles.container}>
            <Text>Push notifications for labels:</Text>
            <MultiSelect
          hideTags
          items={DATA}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select Items"
          searchInputPlaceholderText="Search Items Here..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#00BFA5"
          submitButtonText="Submit"
          tagContainerStyle={{backgroundColor: "red"}}
        />

        </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    biggerContainer: {
        height:"100%",
        width: "100%",
        backgroundColor: "white",


    },
    bigContainer: {
        margin: 60,
    //   flexDirection: "column", 
      alignItems: "center", 

    },
    titleText: {
        fontSize: 20,
        alignSelf: "center",

    },
    container: {
        marginTop: 20,
        width: "100%",
        
        


    },
    subtitleText:{
        marginBottom: 5,
    },
    typeButton: {
        width:100,
        height:40,
        borderRadius: 10,
        backgroundColor: "orange",
        justifyContent: "center",
    },
    buttonText: {
        alignSelf: "center",
    },
    
    
});

export default Settings