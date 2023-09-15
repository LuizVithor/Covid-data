import { filterState } from "utils/filterArray";
import { payload } from "types/payloadGetOnStateT";
import { getOnStateT } from "../../../types/getOnStateT";
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState: getOnStateT[] = []

export const getStates = createAction('getStates', (payload: payload) => ({payload: payload}))

const getOnStateSlice = createSlice({
    name: 'getOnState',
    initialState,
    reducers: {
        setGetOnState(_state, { payload }) {
            return payload
        }, setFilteredStates(state, { payload }) {
            return filterState(payload, state)
        }
    }
})

export const { setGetOnState, setFilteredStates } = getOnStateSlice.actions

export default getOnStateSlice.reducer