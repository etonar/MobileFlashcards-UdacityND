import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Deck from '../components/Deck'
import Button from '../components/Button'
import { lightGreen, black, lightGray } from '../utils/colors'
import ButtonText from '../components/ButtonText'
import { connect, useSelector } from 'react-redux'
import { handleRemoveDeck } from '../redux/actions'

const SingleDeck = ({ navigation, route, dispatch }) => {
  const decks = useSelector((decks) => decks)
  const title = route.params?.title
  const deck = decks[title]
  const id = title
  const questions = deck?.questions

  const setTitle = (title) => {
    navigation.setOptions({ title: title })
  }

  useEffect(() => {
    setTitle(title)
  })

  const deleteDeck = async (id) => {
    const action = await handleRemoveDeck(id, dispatch)
    dispatch(action)
    navigation.navigate('Home', { screen: 'DeckList' })
  }

  return (
    <View style={styles.container}>
      <Deck style={styles.deck} id={id} questions={questions} />
      <View>
        <Button
          textBtn={{ color: black }}
          onPress={() =>
            navigation.navigate('Add New Question', { title: title, id: title })
          }
        >
          Add New Question
        </Button>
        <Button
          btnStyle={{ backgroundColor: black }}
          onPress={() =>
            navigation.navigate('Quiz', { title: title, id: title })
          }
        >
          Start Quiz
        </Button>
      </View>
      <ButtonText onPress={() => deleteDeck(id)}>Delete Deck</ButtonText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
    alignItems: 'center',
    backgroundColor: lightGreen,
  },
  deck: {
    backgroundColor: lightGray,
    borderRadius: 3,
  },
})

export default connect()(SingleDeck)
