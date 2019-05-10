package com.ibm.training.bootcamp.rest.sample01.domain;

import java.math.BigDecimal;
import java.sql.Date;

public class ExpenseTransaction {

	Long id;
	private String transactionName;
	private BigDecimal transactionAmount;
	private Date transactionDate;
	
	public ExpenseTransaction() {
		
	}
	
	public ExpenseTransaction(String transactionName) {
		this.transactionName = transactionName;
}
	public ExpenseTransaction(String transactionName, BigDecimal transactionAmount, Date transactionDate) {
		this(null, transactionName, transactionAmount, transactionDate);
	}

	public ExpenseTransaction(Long id, String transactionName, BigDecimal transactionAmount, Date transactionDate) {
		this.id = id;
		this.transactionName = transactionName;
		this.transactionAmount = transactionAmount;
		this.transactionDate = transactionDate;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTransactionName() {
		return transactionName;
	}
	
	public void setTransactionName(String transactionName) {
		this.transactionName = transactionName;
	}
	
	public BigDecimal getTransactionAmount() {
		return transactionAmount;
	}
	
	public void setTransactionAmount(BigDecimal transactionAmount) {
		this.transactionAmount = transactionAmount;
	}
	
	public Date getTransactionDate() {
		return transactionDate;
	}
	
	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}
	
}
