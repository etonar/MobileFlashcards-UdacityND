import AsyncStorage from '@react-native-async-storage/async-storage'

// AsyncStorage Keys
export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

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
