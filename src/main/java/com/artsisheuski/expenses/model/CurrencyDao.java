package com.artsisheuski.expenses.model;

import com.artsisheuski.expenses.domain.Currency;

import java.util.List;

/**
 * Created by ivanartishevski on 2/21/16.
 */
public interface CurrencyDao {
    List<Currency> getAll();
}
