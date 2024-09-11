import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { createTransaction } from '../../../redux/slices/transactionHistory';
import { ITransaction } from '../../../types';
import { useForm } from 'antd/es/form/Form';
import useSearchParamsHook from '../../../hooks/UseQueryParams';

const {Option} = Select;
const {Title} = Typography;

type FieldType = {
  name?: string;
  amount?: number;
  expense_or_income?: string;
  type?: string;
};

declare global {
  interface String {
      capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this[0]?.toUpperCase() + this?.slice(1)
}

const ExpenseForm: React.FC = () => {
  const {  removeParam } = useSearchParamsHook();
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [actionType, setActionType] = React.useState<'income' | 'expense'>('income');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const id =  Math.floor(Math.random() * 100000)
    const transaction = {...values, id: id} as ITransaction
    dispatch(createTransaction(transaction))
    message.success('Transaction created successfully')
    form.resetFields();
    removeParam("createModal");
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <Form
    form={form}
    name="basic"
    layout='vertical'
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Title level={2}>Create an income or expense</Title>
    <Form.Item<FieldType>
      label="Income or Expense"
      name="expense_or_income"
      rules={[{ required: true, message: 'Please input your income or expense!' }]}
    >
      <Select onChange={(value) => setActionType(value)} placeholder="Select income or expense">
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
    </Form.Item>
    <Form.Item<FieldType>
      label={`${actionType.capitalize()} name`}
      name="name"
      rules={[{ required: true, message: 'Please input your expense name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label={`${actionType.capitalize()} amount`}
      name="amount"
      rules={[{ required: true, message: 'Please input your expense amount!' }]}
    >
      <InputNumber className='w-full' />
    </Form.Item>

    <Form.Item<FieldType>
      label={`${actionType.capitalize()} type`}
      name="type"
      rules={[{ required: true, message: 'Please input your expense type!' }]}
    >
      <Select placeholder="Select expense type">
        <Option value="food">Food</Option>
        <Option value="travel">Travel</Option>
        <Option value="entertainment">Entertainment</Option>
        <Option value="other">Other</Option>
      </Select>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Create an {actionType}
      </Button>
    </Form.Item>
  </Form>
};

export default ExpenseForm;