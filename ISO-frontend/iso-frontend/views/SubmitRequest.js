import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TextInput,ScrollView, Keyboard } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import Header from '../components/Header';
var styleDict = {
    osiColor: "blue",
    isoColor: "#CDB4DB",
}

const SubmitRequest = (props) => {
    const [type, changeType] = useState(true);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);

    
    const DATA = [
        { id: 1, name: 'Food' },
        { id: 2, name: 'Electronics' },
        { id: 3, name: 'Art Supplies' },
        { id: 4, name: 'Service' },
        { id: 5, name: 'Furniture' },
        { id: 6, name: 'Stolen/Lost' },
        { id: 7, name: 'Transportation'},
        { id: 8, name: 'Other'}
      ];

      
 
      

     const createTwoButtonAlert = () =>
    Alert.alert(
      "Submitted!",
      "Your post for " + title + " was successful",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
      //api call

    
    
    const postExample = async () => {
        console.log(selectedItems);
        var requestBody = { 
            title: "coffee2",
            post_type: "ISO", 
            owner_uuid: "test", 
            time_type: "ItemLoan", 
            location_string: "Sontag",
            tags: ["food", "furniture"]
    
        };
        console.log("called api");
        requestBody.title = String(title);
        if (type){
            requestBody.post_type = "ISO";
        } else {
            requestBody.post_type = "OSI";
        }
        requestBody.tags = selectedItems.map((index) => DATA[index-1].name);
        requestBody.location_string = location;
        console.log(requestBody);

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        console.log(requestOptions);

        try {
            await fetch(
                'https://isoapp.dev/api/v1/posts/new', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data);
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onSubmit = () => {

        //TODO: add api post request here
        console.log("submit button pressed");
        postExample();
        createTwoButtonAlert();
        setSelectedItems([]);
        setTitle("");
        changeType(true);
        

      };

  const onSelectedItemsChange = (selectedItems) => {
 
    
    setSelectedItems(selectedItems);
    // var arr = [];
    // if (selectedItems.length > 0){
    //     setSelectedItems(selectedItems.map((index) => DATA[index].name));

    // }

    
    // setSelectedItems(arr);
    console.log(selectedItems);
 
    for (let i = 0; i < selectedItems.length; i++) {
    //   var tempItem = DATA.find(item => item.id === selectedItems[i]);
      // console.log(tempItem);
    }
 
  };


    return (
        <SafeAreaView style={styles.biggerContainer} >
            <Header title="submit a request"/>
        <SafeAreaView style={styles.bigContainer}>
            <View style={styles.container}>
                <Text style={styles.subtitleText}>tap to change type: </Text>
                <TouchableHighlight onPress = { () => {changeType(!type)}}style={styles.typeButton}>
                    <Text style={styles.buttonText}>{type ? "ISO" : "OSI"}</Text>
                </TouchableHighlight>

            </View>
            <View style={styles.container}>
                <Text style={styles.subtitleText}>title:</Text>
                <View style={styles.inputView} >
                <TextInput
        style={{height: 30}}
        placeholder="tap return when done"
        onChangeText={newText => setTitle(newText)}
        defaultValue={title}

      />

                </View>
                

            </View>
            <View style={styles.container}>
                <Text style={styles.subtitleText}>pickup location</Text>
                <View style={styles.inputView} >
                <TextInput
        style={{height: 30}}
        placeholder="tap return when done"
        onChangeText={newText => setLocation(newText)}
        defaultValue={location}

      />

                </View>
                

            </View>

            <SafeAreaView style={styles.container}>

            <Text style={styles.subtitleText}>tags</Text>

            <View style={styles.selectContainer} >
            <MultiSelect
          hideTags
          items={DATA}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="select items"
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
                <Text>submit</Text>
            </TouchableHighlight>

        </SafeAreaView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    biggerContainer: {
        height:"100%",
        width: "100%",
        backgroundColor: "white",

    },
    bigContainer: {
        margin: 30,
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