export interface ITransaction {
    id: number;
    name: string;
    amount: number;
    expense_or_income: string;
    type: string;
}