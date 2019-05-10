package com.ibm.training.bootcamp.rest.sample01.service;

import java.util.List;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseTransaction;

public interface ExpenseTransactionService {

	public List<ExpenseTransaction> findAll();
	
	public List<ExpenseTransaction> findByName(String transactionName);
	
	public void add(ExpenseTransaction transaction);

	public void delete(Long id);
	
	
}
