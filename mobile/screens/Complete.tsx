import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetCompletedTaskQuery } from '../redux/todo.api'
import { Card } from 'react-native-paper'


const Complete = () => {
  const { data } = useGetCompletedTaskQuery()
  return <>
    <FlatList
      data={data?.result}
      renderItem={({ item }) => <Card style={{ marginVertical: 10 }}>
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text>{item.task as string}</Text>
            <Text>{item.description}</Text>
          </View>
        </Card.Content>
      </Card>}
      keyExtractor={item => item._id as unknown as string} />

  </>
}

export default Complete

const styles = StyleSheet.create({})