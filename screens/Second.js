import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'

const config = {
    databaseURL: "https://coba-firebase-49edd.firebaseio.com",
  };
  firebase.initializeApp(config);

class SecondScreen extends React.Component {
    static navigationOptions = {
        title : 'Add Todo',
        headerStyle: {
            backgroundColor: '#778899'
        }
    }

    constructor() {
        super()
        this.state = {
            todo: '',
            deskripsi: '',
            todos: null
        }
    }

    storeTodo = () => {
        const newTodoKey = firebase.database().ref().child('todos').push().key
        firebase.database().ref('todos/').update({ 
        [newTodoKey]: this.state }) 

        this.props.navigation.navigate('Home')

    }

    
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', margin: 32}} >
                <TextInput
                    style={styles.inputBox}
                    placeholder="Judul"
                    onChangeText={(text) => this.setState({title: text})}
                     />

                <TextInput
                    style={styles.inputBox}
                    placeholder="Deskripsi"
                    onChangeText={(text) => this.setState({deskripsi: text})}
                     />

                <TouchableOpacity
                    onPress={() => this.storeTodo()} >
                    <Text style={styles.button}>Add Todo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 32
    },
    inputBox: {
        width: '95%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        padding: 12,
        margin: 6
    },
    button: {
        backgroundColor: '#778899',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 6,
        textAlign:'center',
        margin: 50
      },
  });



export default SecondScreen