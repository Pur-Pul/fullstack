import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            return action.payload
        },
        remove(state, action) {
            return ''
        }
    }
})

export const { set, remove } = notificationSlice.actions
export const notificationSet = (text, seconds) => {
    return dispatch => {
        dispatch(set(text))
        setTimeout(() => {
           dispatch(remove())
        }, seconds*1000)
    }  
}
export default notificationSlice.reducer