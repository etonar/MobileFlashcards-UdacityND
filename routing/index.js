import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

//Views
import {
  DeckList,
  NewDeck,
  NewQuestion,
  Quiz,
  SingleDeck,
  ScoreBoard,
} from '../views'

//icons
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

//colors
import { white, blue, gray } from '../utils/colors'

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

const AppTabConfigs = {
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color }) => {
      let Icon
      if (route.name === 'My Decks') {
        Icon = <MaterialCommunityIcons name='cards' size={25} color={color} />
      } else if (route.name === 'Add New Deck') {
        Icon = <FontAwesome name='plus-square' size={25} color={color} />
      }
      return Icon
    },
    headerShown: false,
    tabBarActiveTintColor: Platform.OS === 'ios' ? blue : white,
    tabBarStyle: {
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      height: 70,
    },
    tabBarIndicatorStyle: {
      backgroundColor: gray,
    },
  }),
}

const RouteConfigs = {
  DeckList: {
    name: 'My Decks',
    component: DeckList,
    options: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    name: 'Add New Deck',
    component: NewDeck,
    options: {
      tabBarLabel: 'Add New Deck',
    },
  },
}

const Home = () => {
  return (
    <Tab.Navigator {...AppTabConfigs}>
      <Tab.Screen {...RouteConfigs.DeckList} />
      <Tab.Screen {...RouteConfigs.NewDeck} />
    </Tab.Navigator>
  )
}

const StackConfig = {
  screenOptions: {
    headerMode: 'screen',
  },
}

const StackScreenConfigs = {
  Home: {
    name: 'Home',
    component: Home,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        fontSize: 25,
        textAlign: 'center',
      },
      headerTitleAlign: 'center',
      title: 'Flashcards Mobile',
    },
  },
  SingleDeck: {
    name: 'Single Deck',
    component: SingleDeck,
    options: ({ navigation, route }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
      },
      title: 'Deck',
      headerBackTitle: 'Flashcards',
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
    }),
  },
  NewQuestion: {
    name: 'Add New Question',
    component: NewQuestion,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
      },
      headerTitleAlign: 'center',
      title: 'Add Question',
    },
  },
  NewDeck: {
    name: 'Add New Deck',
    component: NewDeck,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
      },
      title: 'New Deck',
    },
  },
  Quiz: {
    name: 'Quiz',
    component: Quiz,
    options: {
      headerTintColor: white,

      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
      },
      headerTitleAlign: 'center',
      title: 'Quiz',
    },
  },
  ScoreBoard: {
    name: 'ScoreBoard',
    component: ScoreBoard,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: {
        fontSize: 22,
        textAlign: 'center',
      },
      headerTitleAlign: 'center',
      title: 'ScoreBoard',
    },
  },
}

const Stack = createStackNavigator()

const Navigation = () => (
  <Stack.Navigator {...StackConfig}>
    <Stack.Screen {...StackScreenConfigs.Home} />
    <Stack.Screen {...StackScreenConfigs.SingleDeck} />
    <Stack.Screen {...StackScreenConfigs.NewQuestion} />
    <Stack.Screen {...StackScreenConfigs.NewDeck} />
    <Stack.Screen {...StackScreenConfigs.Quiz} />
    <Stack.Screen {...StackScreenConfigs.ScoreBoard} />
  </Stack.Navigator>
)

export default Navigation
