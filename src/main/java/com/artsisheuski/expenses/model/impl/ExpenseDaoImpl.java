package com.artsisheuski.expenses.model.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.artsisheuski.expenses.domain.Expense;
import com.artsisheuski.expenses.model.ExpenseDao;
import com.artsisheuski.expenses.model.abstractdao.AbstractDaoImpl;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("expenseDao")
@Transactional
public class ExpenseDaoImpl extends AbstractDaoImpl<Expense, Long> implements ExpenseDao {
    private SessionFactory sessionFactory;


    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    @Resource(name = "sessionFactory")
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

//    @Override
//    @Transactional(readOnly = true)
//    public List<Expense> getExpenses() {
//        return sessionFactory.getCurrentSession().getNamedQuery("Expense.SelectAll").list();
//    }

    @Override
    public Expense getExpense(Long id) {
        return (Expense) sessionFactory.getCurrentSession().getNamedQuery("Expense.SelectById")
                .setParameter("id", id).uniqueResult();
    }

    @Override
    public Expense updateExpense(Expense expense) {
        sessionFactory.getCurrentSession().saveOrUpdate(expense);
        return expense;
    }

    @Override
    public Expense saveExpense(Expense expense) {
        sessionFactory.getCurrentSession().save(expense);
        return expense;
    }

    @Override
    public Expense deleteExpense(Expense expense) {
        sessionFactory.getCurrentSession().delete(expense);
        return expense;
    }

    @Override
    public List<Expense> getExpensesByCurrency(String currency) {
        return sessionFactory.getCurrentSession()
                .getNamedQuery("Expenses.SelectByCurrency").setParameter("currency", currency).list();
    }
}
