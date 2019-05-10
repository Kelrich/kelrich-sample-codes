package com.ibm.training.bootcamp.rest.sample01.restcontroller;


import java.math.BigDecimal;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.StringUtils;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseCategory;
import com.ibm.training.bootcamp.rest.sample01.service.ExpenseCategoryService;
import com.ibm.training.bootcamp.rest.sample01.service.ExpenseCategoryServiceImpl;

@Path("/categories")
public class ExpenseCategoryController {

	private ExpenseCategoryService expenseCategoryService;

	public ExpenseCategoryController() {
		this.expenseCategoryService = new ExpenseCategoryServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ExpenseCategory> getExpenseCategory(
			@QueryParam("categoryName") String categoryName,
			@QueryParam("budgetAmount") BigDecimal budgetAmount) {

		try {
			List<ExpenseCategory> categories;
			
			if (StringUtils.isAllBlank(categoryName, String.valueOf(budgetAmount))) {
				categories = expenseCategoryService.findAll();
			} else {
				categories = expenseCategoryService.findByName(categoryName);
			}
						
			return categories;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addExpenseCategory(ExpenseCategory category) {
		String result;
		try {	
			expenseCategoryService.add(category);
				result = "Category added!";
				return Response.status(201).entity(result).build();	
		} catch (Exception e) {
			throw new WebApplicationException(e);
			}
	}
	

//	@PUT
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response updateExpense(Expense expense) {
//
//		try {
//			expenseService.upsert(expense);
//			String result = "Category updated : " + expense.getCategoryName() + expense.getBudgetAmount();
//			return Response.status(200).entity(result).build();
//		} catch (Exception e) {
//			throw new WebApplicationException(e);
//		}
//
//	}
}
