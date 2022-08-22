import { assoc } from './assoc'
// nanoid библиотека
export const generateRandomString = () => Math.random().toString(36).substring(2, 15)

export const assignId = assoc('id', generateRandomString())

export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj)

export const generateIdFront = <O extends object>(obj: O) => assoc('idFront', generateRandomString())(obj)
