import React from 'react'
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'
import * as firebase from 'firebase'

class Update extends React.Component {
    static navigationOptions = {
        title: 'Ubah Data',
        headerStyle: {
            backgroundColor: '#778899'
        }
    }

    constructor(props) {
        const title = props.navigation.getParam('title')
        const deskripsi = props.navigation.getParam('deskripsi')
        const key = props.navigation.getParam('key')
        super(props)
        this.state = {
            key: key,
            title: title,
            deskripsi: deskripsi
        }
    }

    UpdateTodo = (key) => {
        const {title, deskripsi} = this.state

    firebase.database().ref('todos/' + key).set({title: title, deskripsi: deskripsi})

    this.props.navigation.navigate('Home')
    }

    render() {
        const {title, deskripsi, key} = this.state

        console.log(key)
    
    return(
        <View style={{flex: 1, flexDirection: 'column', margin: 32}}>
            <TextInput  
                style={styles.inputBox}
                placeholder="Judul"
                onChangeText={(val) => this.setState({title: val})}
                value={title}
            />
            <TextInput
                style={styles.inputBox}
                placeholder="Deskripsi"
                onChangeText={(val) => this.setState({deskripsi: val})}
                value={deskripsi}
            />
            <TouchableOpacity
              onPress={() => this.UpdateTodo(key)}>
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

  export default Update