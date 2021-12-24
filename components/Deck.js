import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, textColor, red } from '../utils/colors'

const Deck = ({ style = {}, id, questions, onPress }) => {
  if (id === null) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.cardTitle}>No deck on the list</Text>
      </View>
    )
  }

  return (
    <View style={[styles.deck, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.cardTitle}>{id}</Text>
        <Text style={styles.cardSubtitle}>
          {' '}
          {questions && questions?.length}{' '}
          {questions?.length > 1 ? 'Cards' : 'Card'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck: {
    backgroundColor: white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: textColor,
  },
  cardSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 10,
    color: red,
    fontStyle: 'italic',
  },
})

export default Deck
