import ExpenseDisplay from "./expense-display/ExpenseDisplay"
import ExpenseList from "./expense-list/ExpenseList"

const index = () => {
  return (
    <div className="max-w-[1000px] mx-auto shadow-2xl flex-1 p-10 max-h-[500px]">
        <div className="flex justify-between items-start gap-10">
        <ExpenseList/>
        <ExpenseDisplay/>
        </div>
    </div>
  )
}

export default index