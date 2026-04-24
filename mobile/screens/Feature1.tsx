import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { AppNavigation } from '../types/Navigation'

const Feature1 = () => {
  const { navigate } = useNavigation<AppNavigation>()
  return <>
    <View style={{ alignItems: "flex-end", justifyContent: "space-between", height: "100%", padding: 50 }}>
      <View style={{ alignItems: "center", gap: 20 }}>
        <Avatar.Image size={200} source={{ uri: "https://plus.unsplash.com/premium_photo-1712685912274-2483dade540f?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}></Avatar.Image>
        <Text style={{ textAlign: "center" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, quae!</Text>
      </View>
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        <Button mode='contained' onPress={() => navigate("landing")}>Skip</Button>
        <Button mode='contained' onPress={() => navigate("fe2")}>Next</Button>
      </View>
    </View>
  </>
}

export default Feature1

const styles = StyleSheet.create({})