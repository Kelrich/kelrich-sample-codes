package com.ibm.training.bootcamp.rest.sample01.dao;


import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseBudget;

public class ExpenseBudgetJdbcDaoImpl implements ExpenseBudgetDao {

	private static ExpenseBudgetJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public ExpenseBudgetJdbcDaoImpl getInstance() {

		ExpenseBudgetJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new ExpenseBudgetJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private ExpenseBudgetJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:EXPENSEBUDGET");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createBudgetTable();
		insertInitBudget();

	}

	private void createBudgetTable() {
		String createSql = "CREATE TABLE BUDGET "  + " (category VARCHAR(255)," +
							" budget_jan INTEGER," + " budget_feb INTEGER," + " budget_mar INTEGER," +
							" budget_apr INTEGER," + " budget_may INTEGER," + " budget_jun INTEGER," +
							" budget_jul INTEGER," + " budget_aug INTEGER," + " budget_sep INTEGER," +
							" budget_oct INTEGER," + " budget_nov INTEGER," + " budget_dec INTEGER)";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitBudget() {

		add(new ExpenseBudget("UTILITIES", BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000)));
		add(new ExpenseBudget("FOOD", BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000)));
		add(new ExpenseBudget("ENTERTAINMENT", BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000), BigDecimal.valueOf(1000)));
	}
		
	@Override
	public List<ExpenseBudget> findAll() {

		return findByName(null);
	}
	
	@Override
	public List<ExpenseBudget> findByName(String budgetCategory) {
		List<ExpenseBudget> budgets = new ArrayList<>();

		String sql = "SELECT category, budget_jan, budget_feb, budget_mar,"
				+ " budget_apr, budget_may, budget_jun, budget_jul, budget_aug,"
				+ " budget_sep, budget_oct, budget_nov, budget_dec FROM BUDGET WHERE category LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(budgetCategory));
			
			ResultSet results = ps.executeQuery();

			while (results.next()) {
				ExpenseBudget budget = new ExpenseBudget(results.getString("category"),
						results.getBigDecimal("budget_jan"), results.getBigDecimal("budget_feb"), results.getBigDecimal("budget_mar"),
						results.getBigDecimal("budget_apr"), results.getBigDecimal("budget_may"), results.getBigDecimal("budget_jun"),
						results.getBigDecimal("budget_jul"), results.getBigDecimal("budget_aug"), results.getBigDecimal("budget_sep"),
						results.getBigDecimal("budget_oct"), results.getBigDecimal("budget_nov"), results.getBigDecimal("budget_dec"));
				budgets.add(budget);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return budgets;
	}

	private String createSearchValue(String string) {
		
		String value;
		
		if (StringUtils.isBlank(string)) {
			value = "%";
		} else {
			value = string;
		}
		
		return value;
	}
	
	@Override
	public void add(ExpenseBudget budget) {
		
		String insertSql = "INSERT INTO BUDGET (category, budget_jan, budget_feb, budget_mar,"
				+ " budget_apr, budget_may, budget_jun, budget_jul, budget_aug, budget_sep,"
				+ " budget_oct, budget_nov, budget_dec) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, budget.getBudgetCategory());
			ps.setBigDecimal(2, budget.getJan());	ps.setBigDecimal(3, budget.getFeb());
			ps.setBigDecimal(4, budget.getMar());	ps.setBigDecimal(5, budget.getApr());
			ps.setBigDecimal(6, budget.getMay());	ps.setBigDecimal(7, budget.getJun());
			ps.setBigDecimal(8, budget.getJul());	ps.setBigDecimal(9, budget.getAug());
			ps.setBigDecimal(10, budget.getSep());	ps.setBigDecimal(11, budget.getOct());
			ps.setBigDecimal(12, budget.getNov());	ps.setBigDecimal(13, budget.getDec());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	

	@Override
	public void update(ExpenseBudget budget) {
		String updateSql = "UPDATE BUDGET SET budget_jan = ?, budget_feb = ?, budget_mar = ?, budget_apr = ?, budget_may = ?, budget_jun = ?, budget_jul = ?, budget_aug = ?, budget_sep = ?, budget_oct = ?, budget_nov = ?, budget_dec = ? WHERE category = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setBigDecimal(1, budget.getJan());	ps.setBigDecimal(2, budget.getFeb());
			ps.setBigDecimal(3, budget.getMar());	ps.setBigDecimal(4, budget.getApr());
			ps.setBigDecimal(5, budget.getMay());	ps.setBigDecimal(6, budget.getJun());
			ps.setBigDecimal(7, budget.getJul());	ps.setBigDecimal(8, budget.getAug());
			ps.setBigDecimal(9, budget.getSep());	ps.setBigDecimal(10, budget.getOct());
			ps.setBigDecimal(11, budget.getNov());	ps.setBigDecimal(12, budget.getDec());
			ps.setString(13, budget.getBudgetCategory());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}
