import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import rootSaga from '../sagas/sagas'
import thunk from 'redux-thunk'

export default function configureStore (initialState) {
  const SagaMiddleware = createSagaMiddleware()
  const logger = createLogger()
  const store = createStore(
    rootReducer,
    initialState, 
    applyMiddleware(logger, SagaMiddleware,thunk))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  SagaMiddleware.run(rootSaga)
  return store
}
