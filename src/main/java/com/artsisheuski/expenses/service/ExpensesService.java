package com.artsisheuski.expenses.service;

import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.service.impl.Statistics;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

/**
 * Created by ivan on 12.12.15.
 */
public interface ExpensesService {
    List<Expense> getExpenses();
    JSONArray getStatistics(String currency);
    Expense addExpense(Expense expense);
    JSONArray getSum();
    List<String> getCurrencies();
}
