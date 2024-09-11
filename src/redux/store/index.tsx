import { configureStore } from "@reduxjs/toolkit";
import transactionHistoryReducer from "../slices/transactionHistory";

const store = configureStore({
    reducer: {
        transaction: transactionHistoryReducer
    }
})

export {store};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch