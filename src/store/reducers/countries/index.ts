import { countriesT } from "types/countriesT"
import { createAction, createSlice } from "@reduxjs/toolkit"

const initialState: countriesT[] = []

export const getCountries = createAction('getCountries')

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries(_state, { payload }) {
            return payload
        }, setFilteredCountries(state, { payload }) {
            return state.filter(item => item.country === payload)
        }
    }
})

export const { setCountries, setFilteredCountries } = countriesSlice.actions

export default countriesSlice.reducer