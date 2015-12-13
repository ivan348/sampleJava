package com.artsisheuski.expenses.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.artsisheuski.expenses.domain.Expense;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository("expenseDao")
@Transactional
public class ExpenseDaoImpl implements ExpenseDao {
	private SessionFactory sessionFactory;


	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	@Resource(name="sessionFactory")
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	@Transactional(readOnly = true)
	public List<Expense> getExpenses() {
		return sessionFactory.getCurrentSession().getNamedQuery("Expense.SelectAll").list();
	}

	@Override
	public Expense getExpense(Long id) {
		return (Expense) sessionFactory.getCurrentSession().getNamedQuery("Expense.SelectById")
				.setParameter("id", id).uniqueResult();
	}

	@Override
	public void updateExpense(Expense expense) {
		sessionFactory.getCurrentSession().saveOrUpdate(expense);
	}

	@Override
	public Expense saveExpense(Expense expense) {
		return (Expense) sessionFactory.getCurrentSession().save(expense);
	}

	@Override
	public void deleteExpense(Expense expense) {
		sessionFactory.getCurrentSession().delete(expense);
	}

}
