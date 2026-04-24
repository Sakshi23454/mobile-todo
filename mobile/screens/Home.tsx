import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, IconButton, TextInput } from 'react-native-paper'
import { CREATE_TODO_REQUSET, DELETE_TODO_REQUSET, UPDATE_TODO_REQUSET } from '../types/Todo'
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useLazyGetTodosQuery, useUpdateTodoMutation } from './../redux/todo.api'
import { env } from '../config/env'

const Home = () => {
  const [selectedTodo, setselectedTodo] = useState<number | null>(null)

  const [addTodo, { isLoading: addLoading }] = useAddTodoMutation()
  // const { data } = useGetTodosQuery()
  const [readTodo, { data, isLoading }] = useLazyGetTodosQuery()
  const [updateTodo, { isLoading: updateLoading }] = useUpdateTodoMutation()
  const [deleteTodo, { isLoading: deleteLoading }] = useDeleteTodoMutation()

  const schema = z.object({
    task: z.string().min(3),
    description: z.string().min(3),
    priority: z.string().min(3),
    user_id: z.number(),
  }) satisfies z.ZodType<CREATE_TODO_REQUSET>

  const { control, setValue, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { user_id: 1 },
    resolver: zodResolver(schema)
  })

  const handleFormSubmit = async (todoData: CREATE_TODO_REQUSET) => {
    // console.log(todoData)
    try {
      if (selectedTodo) {
        await updateTodo({ ...todoData, _id: selectedTodo }).unwrap()
        console.log("task update succefully")
        reset({ description: "", task: "", priority: "" })
        setselectedTodo(null)
      } else {
        await addTodo(todoData).unwrap()
        console.log("todo add success")
        reset()
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(errors)
  // console.log(data)

  const handleMarkComplete = async (todoData: UPDATE_TODO_REQUSET) => {
    try {
      await updateTodo(todoData).unwrap()
      console.log("complete success")
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (deletetododata: DELETE_TODO_REQUSET) => {
    try {
      await deleteTodo(deletetododata).unwrap()
      console.log("todo delete success")
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (data: any) => {
    reset({
      task: data.task,
      description: data.description,
      priority: data.priority,
       user_id: data.user_id,
    })
  }


  useEffect(() => {
    readTodo()
  }, [])

  return <View style={{ padding: 20, marginTop: 20, flex: 1 }}>
    {/* <Card>
      <Card.Content style={{ gap: 20 }}>
        <TextInput onChangeText={val => setValue("task", val)} mode='outlined' placeholder='Enter your task' />
        <TextInput onChangeText={val => setValue("description", val)} mode='outlined' placeholder='Enter your description' />
        <TextInput onChangeText={val => setValue("priority", val)} mode='outlined' placeholder='Enter your proiority' />
        <Button onPress={handleSubmit(handleFormSubmit)} mode='contained'>Add Task</Button>
      </Card.Content>
    </Card > */}

    <Card>
      <Card.Content style={{ gap: 20 }}>
        <Text>{env.APP_URL}</Text>
        {/* <Controller
          name='task'
          control={control}
          render={({field: {onChange, value}}) => <TextInput onChangeText={onChange} value={value} mode='outlined' placeholder='Enter your task' />
          }
        /> */}

        {
          ["task", "description", "priority"].map((item: any) => <Controller
            name={item}
            control={control}
            render={({ field: { onChange, value } }) => <TextInput onChangeText={onChange} value={value} mode='outlined' placeholder={`Enter your ${item}`} />
            }
          />)
        }
        {
          selectedTodo
            ? <Button onPress={handleSubmit(handleFormSubmit)} mode='outlined'>Update Task</Button>
            : <Button onPress={handleSubmit(handleFormSubmit)} mode='contained'>Add Task</Button>
        }

      </Card.Content>
    </Card >

    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={readTodo} />}
      data={data?.result}
      renderItem={({ item }) => <Card style={{ marginVertical: 10, backgroundColor: item.complete ? "green" : "" }}>
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text>{item.task as string}</Text>
            <Text>{item.description}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconButton disabled={updateLoading} onPress={() => handleMarkComplete({ ...item, complete: true })} mode='contained' icon="check" />
            <IconButton disabled={updateLoading} onPress={() => {
              handleEdit(item)
              setselectedTodo(item._id as number)
            }} mode='contained' icon="pencil" />
            <IconButton disabled={deleteLoading} onPress={() => handleDelete({ _id: item._id as number })} mode='contained' icon="trash-can" />
          </View>
        </Card.Content>
      </Card>}
      keyExtractor={item => item._id as unknown as string} />

  </View>
}

export default Home

const styles = StyleSheet.create({})