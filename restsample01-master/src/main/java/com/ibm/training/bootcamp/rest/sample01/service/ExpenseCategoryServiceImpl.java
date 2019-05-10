package com.ibm.training.bootcamp.rest.sample01.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.ibm.training.bootcamp.rest.sample01.dao.ExpenseCategoryDao;
import com.ibm.training.bootcamp.rest.sample01.dao.ExpenseCategoryJdbcDaoImpl;
import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseCategory;

public class ExpenseCategoryServiceImpl implements ExpenseCategoryService{
	
	ExpenseCategoryDao expenseCategoryDao;

	public ExpenseCategoryServiceImpl() {
		this.expenseCategoryDao = ExpenseCategoryJdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<ExpenseCategory> findAll() {
		return expenseCategoryDao.findAll();
	}

	@Override
	public List<ExpenseCategory> findByName(String categoryName) {
		return expenseCategoryDao.findByName(categoryName);
	}

	@Override
	public void add(ExpenseCategory category) {
		if (validate(category)) {
			expenseCategoryDao.add(category);
		} else {
			throw new IllegalArgumentException("Field category cannot be blank.");
		}
	}
	

//	@Override
//	public void upsert(ExpenseCategory category) {
//		if (validate(category)) {
//			if(category.getId() != null && category.getId() >= 0) {
//				expenseCategoryDao.update(category);
//			} else {
//				expenseCategoryDao.add(category);
//			}
//		} else {
//			throw new IllegalArgumentException("Field category cannot be blank.");
//		}
//	}
	//
	private boolean validate(ExpenseCategory category) {
		return !StringUtils.isBlank(category.getCategoryName());
	}

}
