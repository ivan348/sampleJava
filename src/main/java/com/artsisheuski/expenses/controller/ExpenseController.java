package com.artsisheuski.expenses.controller;

import java.util.List;

import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.domain.User;
import com.artsisheuski.expenses.model.ExpenseDao;
import com.artsisheuski.expenses.model.UserDao;
import com.artsisheuski.expenses.service.impl.Statistics;
import com.artsisheuski.expenses.service.ExpensesService;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/expenses")
public class ExpenseController {

    private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

    @Autowired
    private ExpensesService expensesService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ExpenseDao expenseDao;

    @Transactional(value = "transactionManager")
    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    List<Expense> getExpenses() {
        return expensesService.getExpenses();
    }

    @Transactional(value = "transactionManager")
    @RequestMapping(value="/stat", produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    String getStatistics(@RequestParam String currency){
        ObjectMapper r = new ObjectMapper();
        return expensesService.getStatistics(currency).toString();
    }

    @Transactional(value = "transactionManager")
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    Expense post(@RequestBody Expense expense){
        return expensesService.addExpense(expense);
    }

    @Transactional(value = "transactionManager")
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    Expense put(@RequestBody Expense expense){
        return expenseDao.updateExpense(expense);
    }

    @Transactional(value = "transactionManager")
    @RequestMapping(method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    Expense delete(@RequestBody Expense expense){
        return expenseDao.deleteExpense(expense);
    }

    @Transactional(value = "transactionManager")
    @RequestMapping(value="/sum", produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    String getSum(){
        return expensesService.getSum().toString();
    }

    @Transactional(value = "transactionManager")
    @RequestMapping(value="/currencies", produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    List<String> getCurrencies(){
        return expensesService.getCurrencies();
    }

    /*
    * TODO: move to another controller
    * */
    @Transactional(value = "transactionManager")
    @RequestMapping(value = "users", produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    List<User> getUsers() {
        List<User> list = userDao.getUsers();
        return list;
    }

}
