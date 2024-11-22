import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useNotification = (default_text) => {
    const [notification, setText] = useState(default_text)
    const setNotification = (text) => {
        setText(text)
        setTimeout(() => {
            setText(default_text)
        }, 5000)
    }

    return [
        notification, 
        setNotification
    ]
}