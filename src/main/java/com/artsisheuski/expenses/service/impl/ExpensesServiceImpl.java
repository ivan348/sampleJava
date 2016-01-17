package com.artsisheuski.expenses.service.impl;

import com.artsisheuski.expenses.domain.Category;
import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.model.CategoryDao;
import com.artsisheuski.expenses.model.ExpenseDao;
import com.artsisheuski.expenses.model.UserDao;
import com.artsisheuski.expenses.service.ExpensesService;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by ivan on 12.12.15.
 */
@Service
public class ExpensesServiceImpl implements ExpensesService {

    @Resource
    private ExpenseDao expenseDao;

    @Resource
    private CategoryDao categoryDao;

    @Resource
    private UserDao userDao;

    @Override
    public List<Expense> getExpenses() {
        return expenseDao.getAll();
    }

    @Override
    public JSONArray getStatistics(String currency) {
        JSONArray result = new JSONArray();
        List<Expense> expenses = expenseDao.getExpensesByCurrency(currency);
        Set<String> categories = new HashSet<String>();
        for (Expense expense : expenses) {
            categories.add(expense.getCategory().getName());
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
    public Expense addExpense(Map json) {
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
        mapper.setDateFormat(df);
        Expense expense = mapper.convertValue(json, Expense.class);
        if (expense.getCategory() == null) {
            expense.setCategory(categoryDao.getByKey(Long.parseLong(json.get("category_id").toString())));
        }
        if (expense.getUser() == null) {
            expense.setUser(userDao.getByKey(Long.parseLong(json.get("user_id").toString())));
        }
        expenseDao.saveExpense(expense);
        return expense;
    }

    @Override
    public JSONArray getSum() {
        JSONArray result = new JSONArray();
        List<Expense> expenses = expenseDao.getAll();
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
        List<Expense> expenses = expenseDao.getAll();
        Set<String> currencies = new HashSet<String>();
        for (Expense expense : expenses) {
            currencies.add(expense.getCurrency());
        }
        return new ArrayList<String>(currencies);
    }

    @Override
    public List<Category> getCategories() {
        return categoryDao.getAll();
    }
}
