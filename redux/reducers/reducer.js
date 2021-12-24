import { GET_DECKS, ADD_CARD, ADD_DECK, REMOVE_DECK } from '../actions'

const reducer = (state = {}, action) => {
  if (action.type === GET_DECKS) {
    return {
      ...state,
      ...action.payload.decks,
    }
  }
  if (action.type === ADD_DECK) {
    const { title } = action.payload
    return {
      ...state,
      [title]: {
        title,
        questions: [],
      },
    }
  }
  if (action.type === ADD_CARD) {
    const { deckID, card } = action.payload
    return {
      ...state,
      [deckID]: {
        ...state[deckID],
        questions: [...state[deckID].questions].concat(card),
      },
    }
  }
  if (action.type === REMOVE_DECK) {
    const { id } = action.payload
    const { [id]: value, ...newState } = state
    return newState
  }
  return state
}

export default reducer
