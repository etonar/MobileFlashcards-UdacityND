import React, { useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native'
import { loadAllDecks } from '../redux/actions'
import Deck from '../components/Deck'
import { blue, lightGreen } from '../utils/colors'
import { connect } from 'react-redux'

const DeckList = ({ navigation, dispatch, decks }) => {
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const action = await loadAllDecks(dispatch)
    dispatch(action)
  }

  if (Object.keys(decks).length < 1) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: blue }}>
          {' '}
          No Decks Available!
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(decks).map((deck) => {
          const questions = decks[deck].questions
          return (
            <Deck
              key={deck}
              id={deck}
              questions={questions}
              onPress={() =>
                navigation.navigate('Single Deck', { title: deck })
              }
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
  },
})

const mapStateToProps = (state) => {
  return { decks: state }
}

export default connect(mapStateToProps)(DeckList)
