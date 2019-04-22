import {getExpenseCategoryURL} from './service-url';
import axios from 'axios';

const getExpenseCategory = () => {
    return axios.get(getExpenseCategoryURL);
}

export {
    getExpenseCategory
}