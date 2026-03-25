package com.example.expensetracker.controller;
import java.util.List;

import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    @PostMapping
    public Expense addExpense(@Valid @RequestBody ExpenseDTO dto) {

        Expense expense = new Expense();
        expense.setTitle(dto.getTitle());
        expense.setAmount(dto.getAmount());
        expense.setCategory(dto.getCategory());
        expense.setDate(dto.getDate());

        return service.saveExpense(expense);
    }
    @GetMapping
    public List<Expense> getExpenses() {
        return service.getAllExpenses();
    }

    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
        return "Deleted successfully";
    }
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return service.updateExpense(id, expense);
    }
}