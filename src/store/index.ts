import createSagaMiddleware from 'redux-saga'
import {configureStore} from '@reduxjs/toolkit'
import getOnStateSaga from './sagas/getOnStateSaga'
import getOnStateSlice from './reducers/getOnState'
import getCountriesSaga from './sagas/getCountries'
import countriesSlice from './reducers/countries/index'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        getOnState: getOnStateSlice,
        countries: countriesSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(getOnStateSaga)
sagaMiddleware.run(getCountriesSaga)

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch