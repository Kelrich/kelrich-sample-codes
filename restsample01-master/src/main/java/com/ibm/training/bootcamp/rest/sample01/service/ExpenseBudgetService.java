package com.ibm.training.bootcamp.rest.sample01.service;

import java.util.List;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseBudget;

public interface ExpenseBudgetService {

	public List<ExpenseBudget> findAll();
	
	public List<ExpenseBudget> findByName(String budgetCategory);
	
	public void add(ExpenseBudget budget);
	
	public void upsert(ExpenseBudget budget);
	
}
