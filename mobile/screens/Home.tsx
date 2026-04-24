import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, TextInput } from 'react-native-paper'
import { CREATE_TODO_REQUSET } from '../types/Todo'
import { useAddTodoMutation, useGetTodosQuery } from './../redux/todo.api'

const Home = () => {
  const [addTodo, { isLoading: addLoading }] = useAddTodoMutation()
  const { data } = useGetTodosQuery()

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
      await addTodo(todoData).unwrap()
      console.log("todo add success")
    } catch (error) {
      console.log(error)
    }
  }
  console.log(errors)


  return <View style={{ padding: 20, marginTop: 20 }}>
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

        <Button onPress={handleSubmit(handleFormSubmit)} mode='contained'>Add Task</Button>
      </Card.Content>
    </Card >
  </View>
}

export default Home

const styles = StyleSheet.create({})