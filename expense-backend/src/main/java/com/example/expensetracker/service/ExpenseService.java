package com.example.expensetracker.service;

import com.example.expensetracker.exception.ResourceNotFoundException;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository repo;

    public Expense saveExpense(Expense expense){
        return repo.save(expense);
    }

    public List<Expense> getAllExpenses(){
        return repo.findAll();
    }
    public void deleteExpense(Long id){
        repo.deleteById(id);
    }
    public Expense updateExpense(Long id, Expense updatedExpense) {
        Expense expense = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found"));

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setDate(updatedExpense.getDate());

        return repo.save(expense);
    }
}
