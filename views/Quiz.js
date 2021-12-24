import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import {
  green,
  lightGreen,
  lightBlue,
  red,
  textColor,
  muted,
} from '../utils/colors'
import ButtonText from '../components/ButtonText'
import Button from '../components/Button'

const Quiz = ({ route, navigation, decks }) => {
  const id = route.params?.id
  const deck = decks[id]
  const questions = deck?.questions

  const setTitle = (id) => {
    navigation.setOptions({ title: id })
  }

  useEffect(() => {
    setTitle(`${route.params?.id} Quiz`)
  })

  if (questions?.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.question}>No Cards In Deck!</Text>
      </View>
    )
  }

  const [questionIndex, setQuestionIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [disabledButtons, setDisabledButtons] = useState(false)
  const [showAnswer, setShowAnswer] = useState(true)
  const [nextQuestion, setNextQuestion] = useState(true)

  const markQuestion = (isCorrect) => {
    setCorrectAnswers(isCorrect ? correctAnswers + 1 : correctAnswers)
    setDisabledButtons(true)
    setShowAnswer(false)
    setNextQuestion(false)
  }

  const nextQuestionHandler = () => {
    setQuestionIndex(
      questionIndex >= questions.length - 1 ? 0 : questionIndex + 1
    )
    setCount(count + 1)
    setShowAnswer(true)
    setDisabledButtons(false)
    setNextQuestion(true)
  }

  useEffect(async () => {
    const totalQuestion = questions?.length

    if (setQuestionIndex !== questionIndex) {
      if (count >= totalQuestion) {
        navigation.navigate('ScoreBoard', {
          id,
          correctAnswers,
          totalQuestion,
        })
        setQuestionIndex(0)
        setCount(0)
        setCorrectAnswers(0)
      }
    }
  }, [
    questionIndex,
    setQuestionIndex,
    questions.length,
    count,
    id,
    navigation,
    correctAnswers,
  ])

  const animatedValue = new Animated.Value(0)
  let frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
  let backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  })

  let ref = useRef(0).current

  useEffect(() => {
    animatedValue
    animatedValue.addListener(({ value }) => {
      ref = value
    })
    frontInterpolate
    backInterpolate
  }, [ref, frontInterpolate, backInterpolate])

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  }

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  }

  const FlipCard = () => {
    if (ref >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.count}>
          {questionIndex + 1} of {questions && questions?.length}{' '}
          {questions?.length > 1 ? 'questions' : 'question'}
        </Text>
      </View>
      <View style={styles.inner}>
        <View style={styles.flipContainer}>
          <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
            <Text style={[styles.question]}>
              {questions[questionIndex]?.question}
            </Text>
            <ButtonText
              disabled={showAnswer}
              onPress={() => FlipCard()}
              style={{ fontSize: 15, marginTop: 50 }}
            >
              Show Answer
            </ButtonText>
          </Animated.View>
          <Animated.View
            style={[backAnimatedStyle, styles.flipCard, styles.flipBack]}
          >
            <Text style={[styles.answer]}>
              {questions[questionIndex]?.answer}
            </Text>
            <ButtonText
              disabled={showAnswer}
              onPress={() => FlipCard()}
              style={{ fontSize: 15, marginTop: 50 }}
            >
              Show Question
            </ButtonText>
          </Animated.View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            onPress={() => markQuestion(true)}
            disabled={disabledButtons}
            btnStyle={{ backgroundColor: green, borderColor: green }}
          >
            Correct
          </Button>
          <Button
            onPress={() => markQuestion(false)}
            disabled={disabledButtons}
            btnStyle={{ backgroundColor: red, borderColor: red }}
          >
            Incorrect
          </Button>
          <View style={{ marginTop: 30 }}>
            <ButtonText
              onPress={() => nextQuestionHandler()}
              disabled={nextQuestion}
              style={{
                textAlign: 'right',
                paddingRight: 50,
                color: lightBlue,
                fontSize: 17,
              }}
            >
              Next
            </ButtonText>
          </View>
        </View>
        <View style={{ height: '5%' }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGreen,
    padding: 20,
  },
  question: {
    fontSize: 25,
    fontWeight: 'bold',
    color: textColor,
    textAlign: 'center',
  },
  answer: {
    fontSize: 25,
    fontWeight: 'bold',
    color: textColor,
    textAlign: 'center',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  flipContainer: {
    alignItems: 'center',
  },
  count: {
    fontSize: 20,
    color: muted,
  },
  flipBack: {
    position: 'absolute',
    top: 0,
  },
  flipCard: {
    backfaceVisibility: 'hidden',
  },
})

const mapStateToProps = (state) => {
  return { decks: state }
}

export default React.memo(connect(mapStateToProps)(Quiz))
