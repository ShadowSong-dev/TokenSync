import { configureStore } from '@reduxjs/toolkit';
import { addressReducer } from './addressSlice';

export const store = configureStore({
    reducer: {
        addressReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
