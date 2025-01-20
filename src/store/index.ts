import { configureStore } from '@reduxjs/toolkit'
import companyReducer from './CompanySlice'
import treeReducer from './TreeSlice'

const store = configureStore({
	reducer: {
		company: companyReducer,
		tree: treeReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
export * from './CompanySlice'
export * from './TreeSlice'
