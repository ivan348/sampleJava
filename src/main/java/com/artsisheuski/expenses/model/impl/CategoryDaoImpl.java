package com.artsisheuski.expenses.model.impl;

import com.artsisheuski.expenses.domain.Category;
import com.artsisheuski.expenses.model.CategoryDao;
import com.artsisheuski.expenses.model.abstractdao.AbstractDaoImpl;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ivanartishevski on 1/12/16.
 */
@Repository("categoryDao")
@Transactional
public class CategoryDaoImpl extends AbstractDaoImpl<Category, Long> implements CategoryDao {

//    @Resource(name = "sessionFactory")
//    SessionFactory sessionFactory;
//
//    @Override
//    public List<Category> getCategories() {
//        return sessionFactory.getCurrentSession().createQuery("select distinct c from Category c").list();
//    }
//
//    @Override
//    public Category getCategryById(Long id) {
//        return (Category) sessionFactory.getCurrentSession().createQuery("select distinct c from Category c where c.id=:id").setParameter("id", id).uniqueResult();
//    }
}
