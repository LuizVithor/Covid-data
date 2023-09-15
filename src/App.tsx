/* eslint-disable react-hooks/exhaustive-deps */
import { getStates } from 'store/reducers/getOnState'
import { getCountries } from 'store/reducers/countries'
import { useLayoutEffect, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import Dashboard from 'pages/Dashboard'

function App() {

  const dispatch = useAppDispatch()

  const states = useAppSelector(state => state.getOnState)
  const countries = useAppSelector(state => state.countries)
  useLayoutEffect(() => {
    dispatch(getStates({
      date: undefined,
      state: undefined,
      country: 'brazil'
    }))
    dispatch(getCountries())
  }, [dispatch])

  useEffect(() => {
    console.log(states)
  }, [states])

  useEffect(() => {
    console.log(countries)
  }, [countries])

  return (
    <Dashboard />
  )
}

export default App
