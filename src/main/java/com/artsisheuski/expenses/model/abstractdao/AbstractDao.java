package com.artsisheuski.expenses.model.abstractdao;

import java.io.Serializable;
import java.util.List;

/**
 * Created by ivanartishevski on 1/17/16.
 */
public interface AbstractDao<T,PK extends Serializable> {
    List<T> getAll();
    T getByKey(PK id);
    T save(T object);
    T update(T object);
    T delete(T object);
}
