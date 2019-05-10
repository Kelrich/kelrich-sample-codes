package com.ibm.training.bootcamp.rest.sample01.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.ibm.training.bootcamp.rest.sample01.dao.ExpenseBudgetDao;
import com.ibm.training.bootcamp.rest.sample01.dao.ExpenseBudgetJdbcDaoImpl;
import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseBudget;

public class ExpenseBudgetServiceImpl implements ExpenseBudgetService{
	
	ExpenseBudgetDao expenseBudgetDao;

	public ExpenseBudgetServiceImpl() {
		this.expenseBudgetDao = ExpenseBudgetJdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<ExpenseBudget> findAll() {
		return expenseBudgetDao.findAll();
	}

	@Override
	public List<ExpenseBudget> findByName(String budgetCategory) {
		return expenseBudgetDao.findByName(budgetCategory);
	}

	@Override
	public void add(ExpenseBudget budget) {
		if (validate(budget)) {
			expenseBudgetDao.add(budget);
		} else {
			throw new IllegalArgumentException("Fields cannot be blank.");
		}
	}

	@Override
	public void upsert(ExpenseBudget budget) {
		if (validate(budget)) {
			if(budget.getBudgetCategory() != null) {
				expenseBudgetDao.update(budget);
			} else {
				expenseBudgetDao.add(budget);
			}
		} else {
			throw new IllegalArgumentException("Fields cannot be blank.");
		}
	}
	
	private boolean validate(ExpenseBudget budget) {
		return !StringUtils.isAnyBlank(budget.getBudgetCategory(),
				String.valueOf(budget.getJan()), String.valueOf(budget.getFeb()), String.valueOf(budget.getMar()),
				String.valueOf(budget.getApr()), String.valueOf(budget.getMay()), String.valueOf(budget.getJun()),
				String.valueOf(budget.getJul()), String.valueOf(budget.getAug()), String.valueOf(budget.getSep()),
				String.valueOf(budget.getOct()), String.valueOf(budget.getNov()), String.valueOf(budget.getDec()));
	}

}