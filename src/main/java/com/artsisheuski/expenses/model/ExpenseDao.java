package com.artsisheuski.expenses.model;

import com.artsisheuski.expenses.domain.Expense;

import java.util.List;

public interface ExpenseDao {
	public List<Expense> getExpenses();
	public Expense getExpense(Long id);
	public void updateExpense(Expense expense);
	public void saveExpense(Expense expense);
	public void deleteExpense(Expense expense);
}
