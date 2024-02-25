import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: { status: false }
}

const isLoginSlice = createSlice({
    name: 'isLogin',
    initialState: initialState,
    reducers: {
        setIsLogin(state, action){
            state.isLogin = action.payload
        }
    }
})

const { actions, reducer } = isLoginSlice
export const { setIsLogin } = actions
export default reducer