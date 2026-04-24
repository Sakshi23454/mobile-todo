import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './Home'
import Complete from './Complete'
import Profile from './Profile'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Landing = () => {
  const Tab = createBottomTabNavigator()
  return <>
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}} name='home' component={Home}/>
      <Tab.Screen options={{tabBarIcon: () => <FontAwesome5 name="check" size={24} color="black" />}} name='complete' component={Complete}/>
      <Tab.Screen options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />}} name='profile' component={Profile}/>
    </Tab.Navigator>
  </>
}

export default Landing

const styles = StyleSheet.create({})