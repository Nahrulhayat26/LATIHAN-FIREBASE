import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/Home'
import SecondScreen from './screens/Second'
import UpdateScreen from './screens/Update'

const RootStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Second: {
        screen: SecondScreen
    },
    Update: {
        screen: UpdateScreen
    }
}, {
    initialRouteName: 'Home'
})

export default createAppContainer(RootStack)

