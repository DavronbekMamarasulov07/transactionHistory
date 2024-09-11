import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type ITransaction } from "../../types";

interface IInitialState {
    totalAmount: number,
    transactionHistory: {
        expense: ITransaction[],
        income: ITransaction[]
    }
}

const totalAmount = (expense: ITransaction[], income: ITransaction[]) => {
    return income.reduce((acc: number, b: ITransaction) => acc + b.amount, 0) + expense.reduce((acc: number, b: ITransaction) => acc + b.amount, 0)
}

const initialState: IInitialState ={
    totalAmount: totalAmount(JSON.parse(localStorage.getItem("expense-history") as string) || [], JSON.parse(localStorage.getItem("income-history") as string) || []),
    transactionHistory: {
       expense:  JSON.parse(localStorage.getItem("expense-history") as string) || [],
       income: JSON.parse(localStorage.getItem("income-history") as string) || [],
    }
}

const transactionSlice = createSlice({
    name: "transaction-history",
    initialState,
    reducers: {
        createTransaction: (state, action: PayloadAction<ITransaction>) => {
            const payload = action.payload
            switch(payload.expense_or_income){
                case "income": 
                    state.totalAmount += payload.amount
                    state.transactionHistory.income.push(payload);
                    localStorage.setItem("income-history", JSON.stringify(state.transactionHistory.income))
                break;
                case "expense": 
                    state.totalAmount -= payload.amount
                    state.transactionHistory.expense.push(payload);
                    localStorage.setItem("expense-history", JSON.stringify(state.transactionHistory.expense))
                break;
            }
        },
        removeTransaction: (state, action: PayloadAction<ITransaction>) => {
            state.transactionHistory.expense = state.transactionHistory.expense.filter(item => item.id !== action.payload.id)
            state.transactionHistory.income = state.transactionHistory.income.filter(item => item.id !== action.payload.id)
            // state.totalAmount -= action.payload.amount
            localStorage.setItem("expense-history", JSON.stringify(state.transactionHistory.expense))
            localStorage.setItem("income-history", JSON.stringify(state.transactionHistory.income))
        }
    }
})

export const {createTransaction , removeTransaction} = transactionSlice.actions;
export default transactionSlice.reducer