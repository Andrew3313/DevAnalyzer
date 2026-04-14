import { FetchClient } from './fetch-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const apiClient = new FetchClient(API_URL, {}, 'include')
