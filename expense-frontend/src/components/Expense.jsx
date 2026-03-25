import { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
} from "../services/api";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const [filterCategory, setFilterCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
    setFilteredExpenses(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Prevent future date
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.date > today) {
      alert("Future date not allowed");
      return;
    }

    if (editId) {
      await updateExpense(editId, form);
      setEditId(null);
    } else {
      await addExpense(form);
    }

    setForm({ title: "", amount: "", category: "", date: "" });
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    });
    setEditId(expense.id);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const applyFilters = () => {
    let data = [...expenses];

    if (filterCategory) {
      data = data.filter((e) => e.category === filterCategory);
    }

    if (fromDate) {
      data = data.filter((e) => e.date >= fromDate);
    }

    if (toDate) {
      data = data.filter((e) => e.date <= toDate);
    }

    setFilteredExpenses(data);
  };

  const totalAmount = filteredExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
<div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 p-6">
 <div className="w-full max-w-3xl mx-auto bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30">

        <h1 className="text-3xl font-bold text-center mb-6">
          💰 Expense Tracker
        </h1>

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* LEFT - ADD EXPENSE */}
          <form
            onSubmit={handleSubmit}
           className="bg-indigo-50/80 p-6 rounded-2xl shadow-md border border-indigo-100 flex flex-col gap-3"
          >
            <h2 className="font-semibold text-lg">Add Expense</h2>

            <input
              name="title"
              value={form.title}
              placeholder="Title"
              onChange={handleChange}
              className="p-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              name="amount"
              value={form.amount}
              placeholder="Amount"
              onChange={handleChange}
             className="p-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="p-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              max={today}   // ✅ prevents future date
              onChange={handleChange}
             className="p-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg hover:opacity-90 transition">
              {editId ? "Update Expense" : "Add Expense"}
            </button>
          </form>

          {/* RIGHT - FILTER */}
          <div className="bg-purple-50/80 p-6 rounded-2xl shadow-md border border-purple-100 flex flex-col gap-3">
            <h2 className="font-semibold text-lg">Filters</h2>

            <select
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
            </select>

            <input
              type="date"
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border rounded"
            />

            <input
              type="date"
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border rounded"
            />

            <button
              onClick={applyFilters}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:opacity-90"
            >
              Apply Filters
            </button>

            {/* TOTAL */}
           <div className="mt-3 text-center bg-white/60 p-3 rounded-xl shadow">
              <p className="text-gray-600">Filtered Total</p>
              <p className="text-2xl font-bold text-green-600">
                ₹ {totalAmount}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM - LIST */}
        <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
          <h2 className="font-semibold text-lg mb-4">Expenses</h2>

          {filteredExpenses.map((e) => (
            <div
              key={e.id}
             className="flex justify-between items-center p-3 mb-2 rounded-xl bg-white/60 shadow hover:bg-white/80 transition"
            >
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-gray-500">
                  {e.category} | {e.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-bold text-red-500">₹ {e.amount}</p>

                <button
                  onClick={() => handleEdit(e)}
                 className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(e.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Expense;