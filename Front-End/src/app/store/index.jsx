import { configureStore } from '@reduxjs/toolkit'

import { authReducer, notificationReducer } from './slices'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
  },
})
export * from './slices'
export * from './actions'
export default store