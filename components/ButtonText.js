import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { red, muted } from '../utils/colors'

const ButtonText = ({ children, onPress, style = {}, disabled = false }) => {
  const disabledBtn = disabled ? styles.disabledBtn : {}
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={[styles.btn, style, disabledBtn]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    color: red,
    paddingTop: 10,
    paddingBottom: 10,
  },
  disabledBtn: {
    color: muted,
  },
})

export default ButtonText
