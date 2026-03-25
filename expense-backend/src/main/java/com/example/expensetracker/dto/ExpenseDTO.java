package com.example.expensetracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class ExpenseDTO {
    @NotBlank(message = "Title is required")
    private String title;

    @Positive(message = "Amount must be greater than 0")
    private double amount;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Date is required")
    private String date;
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
