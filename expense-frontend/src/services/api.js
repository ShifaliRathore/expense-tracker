import axios from "axios";

const BASE_URL = "http://localhost:8080/api/expenses";

export const getExpenses = () => axios.get(BASE_URL);

export const addExpense = (expense) => axios.post(BASE_URL, expense);

export const deleteExpense = (id) =>
  axios.delete(`${BASE_URL}/${id}`);

export const updateExpense = (id, expense) =>
  axios.put(`${BASE_URL}/${id}`, expense);