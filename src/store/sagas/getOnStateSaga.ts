/* eslint-disable @typescript-eslint/no-explicit-any */
import { getOnStateT } from 'types/getOnStateT'
import { filterState } from 'utils/filterArray'
import { getStateService } from 'services/api/getStates'
import { call, put, takeEvery } from 'redux-saga/effects'
import { parameterPayload } from 'types/payloadGetOnStateT'
import {getStates, setGetOnState} from '../reducers/getOnState'

function* getOnState(action: parameterPayload) {
    try {
        let response: Generator

        if(action.payload.date) {
            response = yield call(getStateService.getStatesInDate, action.payload.date)
        } else {
            response = yield call(getStateService.getStates)
        }

        const responseTemp = response as unknown as any
        let responseFormated = responseTemp.data.data as getOnStateT[]

        if(action.payload.state) {
            responseFormated = filterState(action.payload.state, responseFormated)
        }

        yield put(setGetOnState(responseFormated))
    } catch(error) {
        console.log(error)
    }
}

/**
 * Generator function that retrieves data about states in Brazil and formats the response based on the provided action object.
 * If the action payload includes a date, it calls the `getStatesInDate` function from the `getStateService` object, passing the date '20200318' as an argument.
 * Otherwise, it calls the `getStates` function from the `getStateService` object.
 * The response is then filtered based on the state specified in the action payload, using the `filterState` function.
 * Finally, the formatted response is dispatched to the `setGetOnState` action using the `put` effect.
 * 
 * @param action - An action object that contains the type and payload properties. The payload can include a date and/or a state.
 * @returns None. The function does not return any value. It dispatches an action with the formatted response.
 * 
 * @example
 * const action = {
 *   type: 'GET_ON_STATE',
 *   payload: {
 *     date: '20200318',
 *     state: 'Sao Paulo'
 *   }
 * }
 * 
 * const generator = getOnState(action)
 * generator.next() // Makes the API call to get states in Brazil on the specified date
 * generator.next() // Filters the response to include only data for Sao Paulo state
 * generator.next() // Dispatches the formatted response to the setGetOnState action
 */

export default function* getOnStateSaga() {
    yield takeEvery(getStates, getOnState)
}