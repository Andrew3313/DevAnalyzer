import { FetchClient } from './fetch-client'

const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL!

export const apiUser = new FetchClient(USER_API_URL, {}, 'include')
