package com.artsisheuski.expenses.controller;

import java.util.List;

import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.domain.User;
import com.artsisheuski.expenses.model.UserDao;
import com.artsisheuski.expenses.service.impl.ExpensesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping(value = "/api/expenses")
public class ExpenseController {
	
	private static final Logger logger = LoggerFactory.getLogger(ExpenseController.class);

	@Autowired
	private ExpensesService expensesService;

	@Autowired
	private UserDao userDao;

	@Transactional(value="transactionManager")
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	List<Expense> getExpenses() {
		return expensesService.getExpenses();
	}

	@Transactional(value="transactionManager")
	@RequestMapping(value = "users",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	List<User> getUsers() {
		List<User> list = userDao.getUsers();
		return list;
	}
	
}
