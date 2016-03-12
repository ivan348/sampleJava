package com.artsisheuski.expenses.model;

import com.artsisheuski.expenses.domain.Category;

import java.util.List;

/**
 * Created by ivanartishevski on 1/12/16.
 */

public interface CategoryDao {
    List<Category> getAll();
    Category getByKey(Long id);
    List<String> getDistinctNames();
}
