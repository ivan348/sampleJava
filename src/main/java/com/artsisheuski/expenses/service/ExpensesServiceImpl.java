package com.artsisheuski.expenses.service;

import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.model.ExpenseDao;
import com.artsisheuski.expenses.service.impl.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ivan on 12.12.15.
 */
@Service
public class ExpensesServiceImpl implements ExpensesService{

    @Resource
    private ExpenseDao expenseDao;

    @Override
    public List<Expense> getExpenses() {
        return expenseDao.getExpenses();
    }
}
