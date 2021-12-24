import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { black, blue, lightGreen, textColor } from '../utils/colors'
import Button from '../components/Button'
import { handleAddDeck } from '../redux/actions'
import { saveDeckTitle } from '../utils/helpers'
import { connect } from 'react-redux'

const NewDeck = ({ dispatch }) => {
  const [title, setTitle] = useState('')
  const navigation = useNavigation()

  const handleTitleChange = (title) => {
    setTitle(title)
  }

  const handleSubmit = (title) => {
    const text = title.trim().split(' ').join('')

    dispatch(handleAddDeck(text))
    saveDeckTitle(text)

    const resetRoute = CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Home' },
        { name: 'Single Deck', params: { title: text, id: text } },
      ],
    })

    navigation.dispatch(resetRoute)

    setTitle('')
  }

  const disabled = title.length === 0

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Enter Deck Title</Text>
        <TextInput
          style={styles.input}
          placeholder='Deck Title'
          placeholderTextColor='grey'
          value={title}
          onChangeText={handleTitleChange}
        />
      </View>
      <Button
        onPress={() => (title.trim() ? handleSubmit(title) : null)}
        disabled={disabled}
        btnStyle={styles.btnSubmit}
      >
        Submit
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 25,
    backgroundColor: lightGreen,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor,
    marginBottom: 20,
  },
  input: {
    borderColor: blue,
    borderWidth: 1,
    height: 50,
    padding: 10,
    marginTop: 15,
    fontSize: 18,
    borderRadius: 5,
  },
  btnSubmit: {
    backgroundColor: black,
    borderColor: black,
    marginBottom: 40,
    marginTop: 0,
  },
})

export default connect()(NewDeck)
