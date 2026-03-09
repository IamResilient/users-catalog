import { usersApi } from '../api/usersApi'

export const usersService = {
    async fetchUsers(limit: number, skip: number) {
        const { data } = await usersApi.getUsers(limit, skip)
        return data
    },

    async searchUsers(query: string) {
        const { data } = await usersApi.searchUsers(query)
        return data
    },
}