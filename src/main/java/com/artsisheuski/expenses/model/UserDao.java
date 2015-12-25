package com.artsisheuski.expenses.model;

import com.artsisheuski.expenses.domain.User;

import java.util.List;

/**
 * Created by ivan on 17.12.15.
 */
public interface UserDao {
    List<User> getUsers();
    User getUserById(Long id);

}
