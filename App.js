import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/Home'
import SecondScreen from './screens/Second'

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Second: {
        screen: SecondScreen
    }
}, {
    initialRouteName: 'Home'
})

export default createAppContainer(RootStack)

