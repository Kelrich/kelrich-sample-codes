import { ExpenseCategoryURL, ExpenseTransactionURL, ExpenseBudgetURL } from './service-url';
import axios from 'axios';

const getExpenseCategory = () => {
    return axios.get(ExpenseCategoryURL);
}

const getExpenseTransaction = () => {
    return axios.get(ExpenseTransactionURL);
}

const getExpenseBudget = () => {
    return axios.get(ExpenseBudgetURL);
}
export {
    getExpenseCategory,
    getExpenseTransaction,
    getExpenseBudget
}