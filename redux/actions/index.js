import { getDecks, removeDeck } from '../../utils/_DATA'

//Actions
export const GET_DECKS = 'GET_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

//Actions Creators
export const handleGetDecks = (decks) => {
  return {
    type: GET_DECKS,
    payload: { decks },
  }
}

export const handleAddDeck = (title) => {
  return {
    type: ADD_DECK,
    payload: { title },
  }
}

export const handleAddCard = (deckID, card) => {
  return {
    type: ADD_CARD,
    payload: { deckID, card },
  }
}

const deleteDeck = (id) => {
  return {
    type: REMOVE_DECK,
    payload: { id },
  }
}

export const handleRemoveDeck = async (id, dispatch) => {
  await removeDeck(id)
  return dispatch(deleteDeck(id))
}

export const loadAllDecks = async (dispatch) => {
  const decks = await getDecks()
  return dispatch(handleGetDecks(decks))
}
