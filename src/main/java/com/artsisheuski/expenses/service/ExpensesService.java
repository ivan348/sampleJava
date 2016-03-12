package com.artsisheuski.expenses.service;

import com.artsisheuski.expenses.domain.Category;
import com.artsisheuski.expenses.domain.Currency;
import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.service.impl.Statistics;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;
import java.util.Map;

/**
 * Created by ivan on 12.12.15.
 */
public interface ExpensesService {
    List<Expense> getExpenses();
    JSONArray getStatistics(String currency);
    Expense addExpense(Map expense);
    Expense editExpense(Map expense);
    JSONArray getSum();
    List<Currency> getCurrencies();
    List<Category> getCategories();
}
