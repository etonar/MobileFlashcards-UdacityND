import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'
import { white, black, lightGray } from '../utils/colors'

const Button = ({
  onPress,
  btnStyle = {},
  textBtn = {},
  children,
  disabled = false,
}) => {
  const disabledBtn = disabled ? styles.disabledBtn : {}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          Platform.OS === 'ios' ? styles.iosBtn : styles.droidBtn,
          btnStyle,
          disabledBtn,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.textButton, textBtn]}>{children}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    padding: 20,
    borderRadius: 10,
    width: 200,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: black,
  },
  droidBtn: {
    backgroundColor: white,
    width: 200,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    borderRadius: 5,
    borderColor: black,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  disabledBtn: {
    backgroundColor: lightGray,
    opacity: 1,
    borderColor: lightGray,
  },
  textButton: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})

export default Button
