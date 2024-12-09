import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

const localStorageMock = (function () {
    let store = {}

    return {
        getItem(key) {
            return store[key]
        },

        setItem(key, value) {
            store[key] = value
        },

        clear() {
            store = {}
        },

        removeItem(key) {
            delete store[key]
        },

        getAll() {
            return store
        },
    }
})()

beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    window.localStorage.setItem(
        'loggedUser',
        JSON.stringify({
            username: 'Tester',
            name: 'Test User',
            id: '1234567890',
        })
    )
})

afterEach(() => {
    cleanup()
})
