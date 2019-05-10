package com.ibm.training.bootcamp.rest.sample01.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.ibm.training.bootcamp.rest.sample01.dao.ExpenseTransactionDao;
import com.ibm.training.bootcamp.rest.sample01.dao.ExpenseTransactionJdbcDaoImpl;
import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseTransaction;

public class ExpenseTransactionServiceImpl implements ExpenseTransactionService{
	
	ExpenseTransactionDao expenseTransactionDao;

	public ExpenseTransactionServiceImpl() {
		this.expenseTransactionDao = ExpenseTransactionJdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<ExpenseTransaction> findAll() {
		return expenseTransactionDao.findAll();
	}

	@Override
	public List<ExpenseTransaction> findByName(String transactionName) {
		return expenseTransactionDao.findByName(transactionName);
	}
	
	@Override
	public void add(ExpenseTransaction transaction) {
		if (validate(transaction)) {
			expenseTransactionDao.add(transaction);
		} else {
			throw new IllegalArgumentException("Field category cannot be blank.");
		}
	}
	
	@Override
	public void delete(Long id) {
		expenseTransactionDao.delete(id);
	}
	
	private boolean validate(ExpenseTransaction transaction) {
		return !StringUtils.isBlank(transaction.getTransactionName());
	}

}
