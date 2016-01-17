package com.artsisheuski.expenses.model.abstractdao;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

/**
 * Created by ivanartishevski on 1/17/16.
 */
public class AbstractDaoImpl<T, PK extends Serializable> implements AbstractDao<T, PK> {

    private final Class<T> persistentClass;

    @SuppressWarnings("unchecked")
    public AbstractDaoImpl(){
        this.persistentClass =(Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass
                ()).getActualTypeArguments()[0];
    }

    @Resource(name = "sessionFactory")
    SessionFactory sessionFactory;

    @Override
    public List<T> getAll() {
        return sessionFactory.getCurrentSession().createCriteria(persistentClass).list();
    }

    @Override
    public T getByKey(PK id) {
        return (T) sessionFactory.getCurrentSession().get(persistentClass, id);
    }

    @Override
    public T save(T object) {
        sessionFactory.getCurrentSession().save(object);
        return object;
    }

    @Override
    public T update(T object) {
        sessionFactory.getCurrentSession().saveOrUpdate(object);
        return object;
    }

    @Override
    public T delete(T object) {
        sessionFactory.getCurrentSession().delete(object);
        return object;
    }

}
