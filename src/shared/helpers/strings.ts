const UNQUOTE_REGEX = /^"|"$/g

export const unquote = (v: string) => v.replace(UNQUOTE_REGEX, '')

export const isEmpty = (v?: string) => !v || v.trim() === ''
