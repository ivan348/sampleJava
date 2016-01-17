package com.artsisheuski.expenses.model.impl;

import com.artsisheuski.expenses.domain.User;
import com.artsisheuski.expenses.model.UserDao;
import com.artsisheuski.expenses.model.abstractdao.AbstractDaoImpl;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ivan on 17.12.15.
 */
@Repository("userDao")
public class UserDaoImpl extends AbstractDaoImpl<User, Long> implements UserDao {

//    private SessionFactory sessionFactory;
//
//    public SessionFactory getSessionFactory() {
//        return sessionFactory;
//    }
//
//    @Autowired
//    public void setSessionFactory(SessionFactory sessionFactory) {
//        this.sessionFactory = sessionFactory;
//    }
//
//    @Override
//    public List<User> getUsers() {
//        return sessionFactory.getCurrentSession().getNamedQuery("User.SelectAll").list();
//    }
//
//    @Override
//    public User getUserById(Long id) {
//        return null;
//    }
}
