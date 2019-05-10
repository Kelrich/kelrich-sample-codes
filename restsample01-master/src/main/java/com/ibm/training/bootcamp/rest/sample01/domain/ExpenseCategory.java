package com.ibm.training.bootcamp.rest.sample01.domain;

public class ExpenseCategory {

	Long id;
	private String categoryName;
	
	public ExpenseCategory() {
		
	}
	
	public ExpenseCategory(String categoryName) {
		this(null, categoryName);
	}

	public ExpenseCategory(Long id, String categoryName) {
		this.id = id;
		this.categoryName = categoryName;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}
	
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
}
