package com.artsisheuski.expenses.service.impl;

import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.model.ExpenseDao;
import com.artsisheuski.expenses.service.ExpensesService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by ivan on 12.12.15.
 */
@Service
public class ExpensesServiceImpl implements ExpensesService {

    @Resource
    private ExpenseDao expenseDao;

    @Override
    public List<Expense> getExpenses() {
        return expenseDao.getExpenses();
    }

    @Override
    public JSONArray getStatistics(String currency) {
        JSONArray result = new JSONArray();
        List<Expense> expenses = expenseDao.getExpensesByCurrency(currency);
        Set<String> categories = new HashSet<String>();
        for (Expense expense : expenses) {
            categories.add(expense.getCategory());
        }
        Float sum = 0f;
        Float fullSum = 0f;
        for (Expense expense : expenses) {
            fullSum += expense.getValue();
        }
        for (String category : categories) {
            for (Expense expense : expenses) {
                if (category.equals(expense.getCategory())) {
                    sum += expense.getValue();
                }
            }
            Map<String, Float> map = new HashMap<String, Float>();
            JSONObject json = new JSONObject();
            json.put("name", category);
            json.put("y", new Float(Math.round(sum / fullSum * 100.0) / 100.0));
            result.put(json);
            sum = 0f;
        }

        return result;
    }

    @Override
    public Expense addExpense(Expense expense) {
        return expenseDao.saveExpense(expense);
    }

    @Override
    public JSONArray getSum() {
        JSONArray result = new JSONArray();
        List<Expense> expenses = expenseDao.getExpenses();
        Set<String> currencies = new HashSet<String>();
        for (Expense expense : expenses) {
            currencies.add(expense.getCurrency());
        }
        for (String currency : currencies) {
            Float sum = 0f;
            for (Expense expense : expenseDao.getExpensesByCurrency(currency)) {
                sum += expense.getValue();
            }
            JSONObject json = new JSONObject();
            json.put("currency", currency);
            json.put("sum", sum);
            result.put(json);
        }
        return result;
    }

    @Override
    public List<String> getCurrencies() {
        List<Expense> expenses = expenseDao.getExpenses();
        Set<String> currencies = new HashSet<String>();
        for (Expense expense : expenses) {
            currencies.add(expense.getCurrency());
        }
        return new ArrayList<String>(currencies);
    }
}
