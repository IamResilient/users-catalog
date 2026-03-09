import axios from 'axios';
import type { UsersResponse } from '../types/user';


const api = axios.create({
    baseURL: 'https://dummyjson.com',
})

export const usersApi = {
    getUsers(limit: number, skip: number) {
        return api.get<UsersResponse>(`/users`, {
            params: { limit, skip },
        })
    },

    searchUsers(query: string) {
        return api.get<UsersResponse>(`/users/search`, {
            params: { q: query },
        })
    },
}