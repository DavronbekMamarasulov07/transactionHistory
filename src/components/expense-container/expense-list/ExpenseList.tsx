import { MdDelete } from "react-icons/md"; 
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Typography, message } from "antd";
import { ITransaction } from "../../../types";
import currencyFormatter from "currency-formatter";
import { useEffect, useState } from "react";
import ExpenseForm from "../expense-form/ExpenseForm";
import useSearchParamsHook from "../../../hooks/UseQueryParams";
import { AppDispatch } from "../../../redux/store";
import { removeTransaction } from "../../../redux/slices/transactionHistory";


const { Title } = Typography;

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this[0]?.toUpperCase() + this?.slice(1);
};

const ExpenseList = () => {
  const { getParam, setParam, removeParam } = useSearchParamsHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    setParam("createModal", "true");
  };

  useEffect(() => {
    if (getParam("createModal") === "true") {
      setIsModalOpen(true);
    }
    else {
      setIsModalOpen(false);
      removeParam("createModal");
    }

  }, [getParam("createModal")])

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    removeParam("createModal");
  };
  const {
    transactionHistory: { income, expense },
  } = useSelector((state: any) => state.transaction);


const handleClearAll = () => {
  message.success("All transactions cleared successfully");
  localStorage.clear();
  location.reload();
}

const handleDelete = (item: ITransaction) => {
  dispatch(removeTransaction(item))
}






  return (
    <div className="w-full">
      <div className="flex gap-4">
        <Button onClick={showModal} className="mb-4" type="primary">
          Create Transaction
        </Button>
        <Button
          onClick={() => handleClearAll()}
          className="mb-4 bg-red-500 hover:!bg-red-600 "
          type="primary"
        >
          Clear All
        </Button>
      </div>
      {income.length > 0 || expense.length > 0 ? (
        <>
          <Title level={3}>History Transaction</Title>
          <div className="flex gap-4 w-full  max-h-[350px] overflow-auto p-3">
            <div className="flex flex-1 w-full flex-col gap-1">
              {income.map((item: ITransaction, index: number) => (
                <div
                  className=" p-2 flex items-center justify-between border-b"
                  key={index}
                >
                  <h1 className="font-semibold">{item.name.capitalize()}</h1>
                  <h1 className="text-green-500">
                    +
                    {currencyFormatter
                      .format(item.amount, { code: "UZS" })
                      .replace("сўм", "UZS")}
                  </h1>
                  <MdDelete onClick={() => handleDelete(income)} className="cursor-pointer text-xl text-red-500" />
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              {expense.map((item: ITransaction, index: number) => (
                <div
                  className="flex items-center justify-between p-2 border-b "
                  key={index}
                >
                  <h1 className="font-semibold">{item.name.capitalize()}</h1>
                  <h1 className="text-red-500">
                    -
                    {currencyFormatter
                      .format(item.amount, { code: "UZS" })
                      .replace("сўм", "UZS")}
                  </h1>
                  <MdDelete onClick={() => handleDelete(expense)} className="cursor-pointer text-xl text-red-500" />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Title level={3}>No Transaction</Title>
      )}
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <div className="m-4">
          <ExpenseForm />
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseList;
