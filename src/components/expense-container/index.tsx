import ExpenseDisplay from "./expense-display/ExpenseDisplay"
import ExpenseList from "./expense-list/ExpenseList"

const index = () => {
  return (
    <div className="max-w-[1200px] mx-auto shadow-2xl flex-1 p-10 h-[450px]">
        <div className="flex justify-between items-start gap-10">
        <ExpenseList/>
        <ExpenseDisplay/>
        </div>
    </div>
  )
}

export default index