import { configureStore } from '@reduxjs/toolkit'
import userchecker from './userchecker'

export default configureStore({
    reducer:{
        verifier:userchecker
    }
})