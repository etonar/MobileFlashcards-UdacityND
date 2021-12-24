import React from 'react'

//Redux Stuff
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducers/reducer'

//Routing (Navigation)
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './routing'

//Notifications
import Notification, { schedulePushNotification } from './utils/notifications'
import { Platform } from 'react-native'

const store = createStore(reducer)

export default function App() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const handleNotif = async () => {
      await Notification()
      const id = await schedulePushNotification()
    }
    handleNotif()
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  )
}
