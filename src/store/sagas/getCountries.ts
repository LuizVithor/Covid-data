/* eslint-disable @typescript-eslint/no-explicit-any */
import { countriesT } from "types/countriesT"
import { getCountries, setCountries } from "store/reducers/countries"
import { call, put, takeEvery } from "redux-saga/effects"
import { getCountriesService } from "services/api/getCountries"

function* getCountriesBack() {
    try {
        const response: Generator = yield call(getCountriesService.getCountries)
        
        const responseTemp = response as unknown as any
        const responseFormated = responseTemp.data.data as countriesT[]

        yield put(setCountries(responseFormated))
    } catch(error) {
        console.log(error)
    }
}

export default function* getCountriesSaga() {
    yield takeEvery(getCountries , getCountriesBack)
}