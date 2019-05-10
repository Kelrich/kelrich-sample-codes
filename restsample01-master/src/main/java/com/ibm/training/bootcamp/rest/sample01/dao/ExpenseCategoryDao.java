package com.ibm.training.bootcamp.rest.sample01.dao;

import java.util.List;
import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseCategory;

public interface ExpenseCategoryDao {
	
	public List<ExpenseCategory> findAll();
	
	public List<ExpenseCategory> findByName(String categoryName);
	
	public void add(ExpenseCategory category);
	
//	public void update(ExpenseCategory category);

}
