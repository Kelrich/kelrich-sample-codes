package com.ibm.training.bootcamp.rest.sample01.restcontroller;


import java.math.BigDecimal;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.StringUtils;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseTransaction;
import com.ibm.training.bootcamp.rest.sample01.service.ExpenseTransactionService;
import com.ibm.training.bootcamp.rest.sample01.service.ExpenseTransactionServiceImpl;

@Path("/transactions")
public class ExpenseTransactionController {

	private ExpenseTransactionService expenseTransactionService;

	public ExpenseTransactionController() {
		this.expenseTransactionService = new ExpenseTransactionServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ExpenseTransaction> getExpenseTransaction(
			@QueryParam("transactionName") String transactionName,
			@QueryParam("transactionAmount") BigDecimal transactionAmount,
			@QueryParam("transactionDate") java.sql.Date transactionDate) {

		try {
			List<ExpenseTransaction> transactions;
			
			if (StringUtils.isAllBlank(transactionName, String.valueOf(transactionAmount), String.valueOf(transactionDate))) {
				transactions = expenseTransactionService.findAll();
			} else {
				transactions = expenseTransactionService.findByName(transactionName);
			}
						
			return transactions;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addExpenseTransaction(ExpenseTransaction transaction) {
		String result;
		try {	
			expenseTransactionService.add(transaction);
			result = "Transaction added!";
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@DELETE
	public Response deleteUser(@QueryParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			expenseTransactionService.delete(longId);
			String result = "Transaction deleted";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}
