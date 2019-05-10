package com.ibm.training.bootcamp.rest.sample01.dao;

import java.util.List;
import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseBudget;

public interface ExpenseBudgetDao {
	
	public List<ExpenseBudget> findAll();
	
	public List<ExpenseBudget> findByName(String budgetCategory);
	
	public void add(ExpenseBudget budget);
	
	public void update(ExpenseBudget budget);

}
