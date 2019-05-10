package com.ibm.training.bootcamp.rest.sample01.domain;

import java.math.BigDecimal;

public class ExpenseBudget {
	private String budgetCategory;
	private BigDecimal Jan, Feb, Mar, Apr, May,	Jun,
					   Jul, Aug, Sep, Oct, Nov, Dec;
	
	public ExpenseBudget() {
	}
	
	public ExpenseBudget(String budgetCategory,
						BigDecimal Jan, BigDecimal Feb, BigDecimal Mar, BigDecimal Apr,
						BigDecimal May, BigDecimal Jun, BigDecimal Jul, BigDecimal Aug,
						BigDecimal Sep, BigDecimal Oct, BigDecimal Nov, BigDecimal Dec) {
		this.budgetCategory = budgetCategory;
		this.Jan = Jan;	this.Feb = Feb;	this.Mar = Mar;	this.Apr = Apr;
		this.May = May;	this.Jun = Jun;	this.Jul = Jul;	this.Aug = Aug;
		this.Sep = Sep;	this.Oct = Oct;	this.Nov = Nov;	this.Dec = Dec;	
	}
		public String getBudgetCategory() {
		return budgetCategory;
	}
	
	public void setBudgetCategory(String budgetCategory) {
		this.budgetCategory = budgetCategory;
	}

	public BigDecimal getJan() {
		return Jan;
	}

	public void setJan(BigDecimal jan) {
		this.Jan = jan;
	}

	public BigDecimal getFeb() {
		return Feb;
	}

	public void setFeb(BigDecimal feb) {
		this.Feb = feb;
	}

	public BigDecimal getMar() {
		return Mar;
	}

	public void setMar(BigDecimal mar) {
		this.Mar = mar;
	}

	public BigDecimal getApr() {
		return Apr;
	}

	public void setApr(BigDecimal apr) {
		this.Apr = apr;
	}

	public BigDecimal getMay() {
		return May;
	}

	public void setMay(BigDecimal may) {
		this.May = may;
	}

	public BigDecimal getJun() {
		return Jun;
	}

	public void setJun(BigDecimal jun) {
		this.Jun = jun;
	}

	public BigDecimal getJul() {
		return Jul;
	}

	public void setJul(BigDecimal jul) {
		this.Jul = jul;
	}

	public BigDecimal getAug() {
		return Aug;
	}

	public void setAug(BigDecimal aug) {
		this.Aug = aug;
	}

	public BigDecimal getSep() {
		return Sep;
	}

	public void setSep(BigDecimal sep) {
		this.Sep = sep;
	}

	public BigDecimal getOct() {
		return Oct;
	}

	public void setOct(BigDecimal oct) {
		this.Oct = oct;
	}

	public BigDecimal getNov() {
		return Nov;
	}

	public void setNov(BigDecimal nov) {
		this.Nov = nov;
	}

	public BigDecimal getDec() {
		return Dec;
	}

	public void setDec(BigDecimal dec) {
		this.Dec = dec;
	}

}
