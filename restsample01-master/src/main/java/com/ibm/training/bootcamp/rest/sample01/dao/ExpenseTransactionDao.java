package com.ibm.training.bootcamp.rest.sample01.dao;


import java.util.List;
import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseTransaction;

public interface ExpenseTransactionDao {
	
	public List<ExpenseTransaction> findAll();
	
	public List<ExpenseTransaction> findByName(String transactionName);
	
	public void add(ExpenseTransaction transaction);

	public void delete(Long id);

}
