package com.artsisheuski.expenses.model;

import com.artsisheuski.expenses.domain.Expense;

import java.util.List;

public interface ExpenseDao {
	List<Expense> getAll();
	Expense getExpense(Long id);
	Expense updateExpense(Expense expense);
	Expense saveExpense(Expense expense);
	Expense deleteExpense(Expense expense);
	List<Expense> getExpensesByCurrency(String currency);
}
