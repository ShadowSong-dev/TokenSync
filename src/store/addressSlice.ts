import { createSlice } from "@reduxjs/toolkit";

const initialState: string = 'null';

// The current address that user search, not the current connected wallet address
const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        switch(_, action) {
            return action.payload;
        }
    }
});

export const addressReducer = addressSlice.reducer;
export const addressActions = addressSlice.actions;
