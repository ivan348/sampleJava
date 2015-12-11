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
	@Transactional(readOnly=true)
	public List<Expense> getExpenses() {
		return sessionFactory.getCurrentSession().createQuery("select Expense e").list();
	}

	@Override
	public Expense getExpense(Long id) {
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("id", id);
		return null;
	}

	@Override
	public void updateExpense(Expense expense) {
		// TODO Auto-generated method stub

	}

	@Override
	public void saveExpense(Expense expense) {
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteExpense(Expense expense) {
		// TODO Auto-generated method stub

	}

}
