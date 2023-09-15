import * as api from 'services/axios'

export const getStateService = {
    getStates: async () => {
        const response = await api.get('')
        return response
    }, getStatesInDate: async (date: string) => {
        const response = await api.get(`brazil/${date}`)
        return response
    }
}