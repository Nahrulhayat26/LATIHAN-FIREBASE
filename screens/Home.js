import React from 'react';
import axios from 'axios'
import { StyleSheet, View, FlatList, Text, Button, TextInput } from 'react-native'
import * as firebase from 'firebase'

const config = {
    databaseURL: "https://coba-firebase-49edd.firebaseio.com",
  };
  firebase.initializeApp(config);


class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor() {
        super()
        this.state = {
            todo: '',
            todos: null
        }
    }

    componentDidMount() {
        firebase.database().ref('todos/').on('value', (snapshot) => {
            const todos = snapshot.val()
            this.setState({todos: todos})
        })
    }

    storeTodo = () => {
        const newTodoKey = firebase.database().ref().child('todos').push().key
        firebase.database().ref('todos/').update({ [newTodoKey]: this.state.todo })

    }

    removeTodo = (key) => {
        firebase.database().ref('todos/' + key).remove()
    }

    render() {
        const todos = !this.state.todos ? [] : Object.keys(this.state.todos).map( key => {
            return {
                key: key,
                text: this.state.todos[key]
            }
        })
        return (
            <View style={{flex: 1, flexDirection: 'column', margin: 32}} >
                <TextInput
                    placeholder="New Todo ..."
                    onChangeText={(text) => this.setState({todo: text})}
                    style={styles.textInput} />
                <Button
                    title="Add Todo"
                    onPress={() => this.storeTodo()}
                />
                
                <FlatList
                  data={todos}
                  renderItem={({item}) => {
                      return (
                          <View>
                              <Text>{item.text}</Text>
                              <Button title="Hapus" onPress={() => this.removeTodo(item.key)} />
                          </View>
                      )
                  }}
                />
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
  });

  export default Home