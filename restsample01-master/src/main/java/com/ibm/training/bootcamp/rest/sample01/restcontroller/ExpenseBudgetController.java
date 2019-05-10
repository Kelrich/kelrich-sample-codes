package com.ibm.training.bootcamp.rest.sample01.restcontroller;

import java.math.BigDecimal;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.StringUtils;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseBudget;
import com.ibm.training.bootcamp.rest.sample01.service.ExpenseBudgetService;
import com.ibm.training.bootcamp.rest.sample01.service.ExpenseBudgetServiceImpl;

@Path("/budget")
public class ExpenseBudgetController {

	private ExpenseBudgetService expenseBudgetService;

	public ExpenseBudgetController() {
		this.expenseBudgetService = new ExpenseBudgetServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ExpenseBudget> getBudgets(
			@QueryParam("budgetCategory") String budgetCategory, 
			@QueryParam("jan") BigDecimal Jan, @QueryParam("feb") BigDecimal Feb,
			@QueryParam("mar") BigDecimal Mar, @QueryParam("apr") BigDecimal Apr,
			@QueryParam("may") BigDecimal May, @QueryParam("jun") BigDecimal Jun,
			@QueryParam("jul") BigDecimal Jul, @QueryParam("aug") BigDecimal Aug,
			@QueryParam("sep") BigDecimal Sep, @QueryParam("oct") BigDecimal Oct,
			@QueryParam("nov") BigDecimal Nov, @QueryParam("dec") BigDecimal Dec) {

		try {
			List<ExpenseBudget> budgets;
			
			if (StringUtils.isAllBlank(budgetCategory, String.valueOf(Jan), String.valueOf(Feb), String.valueOf(Mar), String.valueOf(Apr), String.valueOf(May),
					String.valueOf(Jun), String.valueOf(Jul), String.valueOf(Aug), String.valueOf(Sep), String.valueOf(Oct), String.valueOf(Nov), String.valueOf(Dec))) {
				budgets = expenseBudgetService.findAll();
			} else {
				budgets = expenseBudgetService.findByName(budgetCategory);
			}
						
			return budgets;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addExpenseBudget(ExpenseBudget budget) {

		try {
			expenseBudgetService.add(budget);
			String result = "Budget added!";
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateExpenseBudget(ExpenseBudget budget) {

		try {
			expenseBudgetService.upsert(budget);
			String result = "Budget updated!";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}
}
