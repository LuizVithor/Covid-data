import * as api from 'services/axios'

export const getCountriesService = {
    getCountries: async () => {
        const response = await api.get('countries')
        return response
    }
}