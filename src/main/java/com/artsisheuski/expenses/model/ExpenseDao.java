package com.artsisheuski.expenses.model;

import com.artsisheuski.expenses.domain.Expense;

import java.util.List;

public interface ExpenseDao {
	List<Expense> getExpenses();
	Expense getExpense(Long id);
	void updateExpense(Expense expense);
	Expense saveExpense(Expense expense);
	void deleteExpense(Expense expense);
}
