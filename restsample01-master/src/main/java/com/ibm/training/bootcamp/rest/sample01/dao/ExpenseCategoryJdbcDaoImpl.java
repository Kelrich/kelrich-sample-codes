package com.ibm.training.bootcamp.rest.sample01.dao;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseCategory;

public class ExpenseCategoryJdbcDaoImpl implements ExpenseCategoryDao {

	private static ExpenseCategoryJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public ExpenseCategoryJdbcDaoImpl getInstance() {

		ExpenseCategoryJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new ExpenseCategoryJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private ExpenseCategoryJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:EXPENSECATEGORY");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createCategoryTable();
		insertInitCategories();

	}

	private void createCategoryTable() {
		String createSql = "CREATE TABLE CATEGORY " + "(id INTEGER IDENTITY PRIMARY KEY, " + " category VARCHAR(255))";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitCategories() {

		add(new ExpenseCategory("UTILITIES"));
		add(new ExpenseCategory("FOOD"));
		add(new ExpenseCategory("ENTERTAINMENT"));
	}

	@Override
	public List<ExpenseCategory> findAll() {

		return findByName(null);
	}
	
	@Override
	public List<ExpenseCategory> findByName(String categoryName) {
		List<ExpenseCategory> categories = new ArrayList<>();

		String sql = "SELECT id, category FROM CATEGORY WHERE category LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(categoryName));
			
			ResultSet results = ps.executeQuery();

			while (results.next()) {
				ExpenseCategory category = new ExpenseCategory(Long.valueOf(results.getInt("id")), results.getString("category"));
				categories.add(category);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return categories;
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
	public void add(ExpenseCategory category) {
		
		String insertSql = "INSERT INTO CATEGORY (category) VALUES (?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, category.getCategoryName());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	

//	@Override
//	public void update(ExpenseCategory category) {
//		String updateSql = "UPDATE expenses SET category = ?, amount = ? WHERE id = ?";
//
//		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {
//
//			ps.setString(1, category.getCategoryName());
//			ps.setBigDecimal(2, category.getBudgetAmount());
//			ps.setLong(3, category.getId());
//			ps.executeUpdate();
//
//		} catch (SQLException e) {
//			e.printStackTrace();
//			throw new RuntimeException(e);
//		}
//	}

}
