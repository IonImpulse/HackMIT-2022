import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const styleDict = {
    osiColor: "blue",
    isoColor: "orange",
}

const SubmitRequest = (props) => {
    const [type, changeType] = useState(true);
    const [title, setTitle] = useState("");
    
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
 
      

     const createTwoButtonAlert = () =>
    Alert.alert(
      "Submitted!",
      "Your post for " + title + " was successful",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const onSubmit = () => {
        console.log("submit button pressed");
        createTwoButtonAlert();
        setSelectedItems([]);
        setTitle("");
        changeType(true);
        

      };

  const onSelectedItemsChange = (selectedItems) => {
 
    setSelectedItems(selectedItems);
 
    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = DATA.find(item => item.id === selectedItems[i]);
      // console.log(tempItem);
    }
    console.log(selectedItems);
 
  };


    return (
        <View style={styles.biggerContainer} >
        <SafeAreaView style={styles.bigContainer}>
            <Text style={styles.titleText}>Submit a Request</Text>

            <View style={styles.container}>
                <Text style={styles.subtitleText}>Tap to change type: </Text>
                <TouchableHighlight onPress = { () => {changeType(!type)}}style={styles.typeButton}>
                    <Text style={styles.buttonText}>{type ? "ISO" : "OSI"}</Text>
                </TouchableHighlight>

            </View>
            <View style={styles.container}>
                <Text style={styles.subtitleText}>Title</Text>
                <View style={styles.inputView} >
                <TextInput
        style={{height: 30}}
        placeholder="Tap return when done"
        onChangeText={newText => setTitle(newText)}
        defaultValue={title}

      />

                </View>
                

            </View>

            <SafeAreaView style={styles.container}>

            <Text style={styles.subtitleText}>Tags</Text>

            <View style={styles.selectContainer} >
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
        </SafeAreaView>
            <TouchableHighlight onPress={onSubmit}style={styles.submit}>
                <Text>Submit</Text>
            </TouchableHighlight>

        </SafeAreaView>
        </View>
        
    );
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
    container: {
        marginTop: 20,
        width: "100%",
        
        


    },
    selectContainer: {
        
        // alignSelf:"center",

      },
    titleText: {
        fontSize: 20,

    },
    subtitleText:{
        marginBottom: 5,
    },
    typeButton: {
        width:100,
        height:40,
        borderRadius: 10,
        backgroundColor: styleDict.isoColor,
        justifyContent: "center",
    },
    buttonText: {
        alignSelf: "center",
    },
    inputView: {
        borderWidth: 1,
        padding: 5,
        borderColor: "black",
        borderRadius: 5,
    },
    submit:{
        width: "100%",
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: styleDict.isoColor,
    }
});


export default SubmitRequest;