package com.artsisheuski.expenses.service.impl;

import com.artsisheuski.expenses.domain.*;
import com.artsisheuski.expenses.domain.Currency;
import com.artsisheuski.expenses.model.CategoryDao;
import com.artsisheuski.expenses.model.CurrencyDao;
import com.artsisheuski.expenses.model.ExpenseDao;
import com.artsisheuski.expenses.model.UserDao;
import com.artsisheuski.expenses.service.ExpensesService;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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

    @Resource
    private CurrencyDao currencyDao;

    @Override
    public List<Expense> getExpenses() {
        return expenseDao.getAll();
    }

    @Override
    public JSONArray getStatistics(String currency) {
        JSONArray result = new JSONArray();
        List<Category> categories = categoryDao.getAll();
        Double fullSum = expenseDao.getSum();
        for (Category category : categories) {
            Double sum = expenseDao.getSumByCategory(category.getId());
            if (sum != null) {
                JSONObject json = new JSONObject();
                json.put("name", category.getName());
                json.put("y", new Float(Math.round(sum / fullSum * 100.0) / 100.0));
                result.put(json);
            }
        }

        return result;
    }

    @Override
    public Expense addExpense(Map json) {
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(df);
        Expense expense = mapper.convertValue(json, Expense.class);
        if (expense.getCategory() == null) {
            expense.setCategory(categoryDao.getByKey(Long.parseLong(json.get("category_id").toString())));
        }
        if (expense.getUser() == null) {
            expense.setUser(userDao.getByKey(Long.parseLong(json.get("user_id").toString())));
        }
        return expenseDao.saveExpense(expense);
    }

    @Override
    public Expense editExpense(Map json) {
        ObjectMapper mapper = new ObjectMapper();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(df);
        Expense expense = mapper.convertValue(json, Expense.class);
        if (expense.getCategory() == null) {
            expense.setCategory(categoryDao.getByKey(Long.parseLong(json.get("category_id").toString())));
        }
        if (expense.getUser() == null) {
            expense.setUser(userDao.getByKey(Long.parseLong(json.get("user_id").toString())));
        }
        expenseDao.updateExpense(expense);
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
    public List<Currency> getCurrencies() {
        return currencyDao.getAll();
    }

    @Override
    public List<Category> getCategories() {
        return categoryDao.getAll();
    }
}
