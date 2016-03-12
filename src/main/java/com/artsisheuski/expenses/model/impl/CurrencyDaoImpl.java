package com.artsisheuski.expenses.model.impl;

import com.artsisheuski.expenses.domain.Currency;
import com.artsisheuski.expenses.model.CurrencyDao;
import com.artsisheuski.expenses.model.abstractdao.AbstractDaoImpl;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by ivanartishevski on 2/21/16.
 */
@Repository("currencyDao")
@Transactional
public class CurrencyDaoImpl extends AbstractDaoImpl<Currency, Long> implements CurrencyDao{

}
