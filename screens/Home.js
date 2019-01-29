import React from 'react';
import axios from 'axios'
import { StyleSheet, View, FlatList, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'




class Home extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#778899'
        }
    }

    constructor() {
        super()
        this.state = {
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
                text: this.state.todos[key].title,
                deskripsi: this.state.todos[key].deskripsi
            }
        })
        return (
            <View style={{flex: 1, flexDirection: 'column', margin: 32}} >
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Second')}>
                    <Text style={styles.button1}>Add Todo</Text>
                </TouchableOpacity>
                
                <FlatList
                  data={todos}
                  renderItem={({item}) => {
                      return (
                          <View>
                              <Text style={styles.inputBox}>{item.text}</Text>
                              <Text style={styles.inputBox}>{item.deskripsi}</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Update', {
                                  key: item.key,
                                  title: item.text,
                                  deskripsi: item.deskripsi
                              })}>
                             <Text style={styles.button}>Ubah Data</Text>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => this.removeTodo(item.key)}>
                                <Text style={styles.button}>Hapus</Text>
                              </TouchableOpacity>
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
        margin: 20
      },
      button1: {
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
        margin: 6
      }
  });

  export default Home