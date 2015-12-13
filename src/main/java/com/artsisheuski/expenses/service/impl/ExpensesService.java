package com.artsisheuski.expenses.service.impl;

import com.artsisheuski.expenses.domain.Expense;

import java.util.List;

/**
 * Created by ivan on 12.12.15.
 */
public interface ExpensesService {
    List<Expense> getExpenses();
}
