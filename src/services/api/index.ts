import axios from 'axios'

export const apiClient = axios.create({
	baseURL: 'http://localhost:3005/'
})

const { get, post, delete: destroy } = apiClient
export { get, post, destroy }