package com.ibm.training.bootcamp.rest.sample01.service;

import java.util.List;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseCategory;

public interface ExpenseCategoryService {

	public List<ExpenseCategory> findAll();
	
	public List<ExpenseCategory> findByName(String categoryName);
	
	public void add(ExpenseCategory category);
	//public void upsert(ExpenseCategory category);
	
}
