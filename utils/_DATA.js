import { DECKS_STORAGE_KEY } from './helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
}

export const getDecks = async () => {
  const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  if (data === null) {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  }
  return data === null ? decks : JSON.parse(data)
}

export const getDeck = async (id) => {
  const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  return JSON.parse(data)[id]
}

export const saveDeckTitle = async (title) => {
  await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  )
}

export const removeDeck = async (key) => {
  const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  const deck = JSON.parse(data)
  deck[key] = undefined
  delete deck[key]
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export const addCardToDeck = async (title, card) => {
  const deck = await getDeck(title)
  await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        questions: [...deck.questions].concat(card),
      },
    })
  )
}
