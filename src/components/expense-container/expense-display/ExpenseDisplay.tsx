import { useSelector } from "react-redux";
import { Typography } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import currencyFormatter from 'currency-formatter';
import { Doughnut } from 'react-chartjs-2';
import { ITransaction } from "../../../types";
const {Title} = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);







const ExpenseDisplay = () => {
  const {totalAmount} = useSelector((state: any) => state.transaction)
  const {transactionHistory: {income, expense}} = useSelector((state: any) => state.transaction)

  const expenseTotal = expense.reduce((total: number, item: ITransaction) => total + item.amount, 0)
  const incomeTotal = income.reduce((total: number, item: ITransaction) => total + item.amount, 0)
  const labels =
    expenseTotal > incomeTotal
      ? ["Expenses Higher", "Income"]
      : ["Income", "Expenses"];

  const data = {
    datasets: [
      {
        labels: labels,
        data: [expenseTotal, incomeTotal],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  

  console.log(totalAmount)
  return (
    <div>
      <Doughnut data={data}  />
      <Title className="text-center mt-8" level={3}>{currencyFormatter.format(totalAmount, { code: 'UZS' }).replace("сўм", "UZS")}</Title>
    </div>
  )
}

export default ExpenseDisplay