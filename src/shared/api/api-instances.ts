import { FetchClient } from './fetch-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export const apiClient = new FetchClient(API_URL, {}, 'include')
