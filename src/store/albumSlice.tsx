import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface Deleted {
    [key: string]: {
        items: number[]
    }
}
interface DeletedItems {
    deletedItems: Deleted | null
    
}

  // Define the initial state using that type

const initialState: DeletedItems = {
    deletedItems: null
}

export const albumSlice = createSlice({
  name: 'albums',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    storeDeleteItems: (state, action: PayloadAction<{userId: number, albumId: number}>) => {
        const {albumId, userId} = action.payload
        let newState = {...state.deletedItems}
        if(!newState){
            const newObj: Deleted = {}
            newObj[userId] = {items: [albumId]}
            newState = newObj
        } else {
            if(newState[userId]){
                const oldArray = newState[userId].items
                oldArray.push(albumId)
                newState[userId].items = oldArray
            } else {
                newState[userId] = {
                    items: [albumId]
                }
            }
        }
        state.deletedItems = newState
    },
    resetItems: (state) => {
        state.deletedItems = null
    }
  },
})

export const { storeDeleteItems, resetItems } = albumSlice.actions

export default albumSlice.reducer