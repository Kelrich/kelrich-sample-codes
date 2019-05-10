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

import com.ibm.training.bootcamp.rest.sample01.domain.ExpenseTransaction;

public class ExpenseTransactionJdbcDaoImpl implements ExpenseTransactionDao {

	private static ExpenseTransactionJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public ExpenseTransactionJdbcDaoImpl getInstance() {

		ExpenseTransactionJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new ExpenseTransactionJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private ExpenseTransactionJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:EXPENSETRANSACTION");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createTransactionTable();
		insertInitTransactions();

	}

	private void createTransactionTable() {
		String createSql = "CREATE TABLE TRANSACTION " + "(id INTEGER IDENTITY PRIMARY KEY, " + " transaction_name VARCHAR(255), " + "transaction_amount INTEGER, " + "transaction_date DATE NOT NULL)";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitTransactions() {
		java.util.Date date = new java.util.Date();
		java.sql.Date currentdate = new java.sql.Date(date.getTime());
		
		add(new ExpenseTransaction("UTILITIES", BigDecimal.valueOf(1000), currentdate));
		add(new ExpenseTransaction("FOOD", BigDecimal.valueOf(1000), currentdate));
		add(new ExpenseTransaction("ENTERTAINMENT", BigDecimal.valueOf(1000), currentdate));
	}

	@Override
	public List<ExpenseTransaction> findAll() {

		return findByName(null);
	}
	
	@Override
	public List<ExpenseTransaction> findByName(String transactionName) {
		List<ExpenseTransaction> transactions = new ArrayList<>();

		String sql = "SELECT id, transaction_name, transaction_amount, transaction_date FROM TRANSACTION WHERE transaction_name LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(transactionName));
			
			ResultSet results = ps.executeQuery();

			while (results.next()) {
				ExpenseTransaction transaction = new ExpenseTransaction(Long.valueOf(results.getInt("id")), results.getString("transaction_name"), results.getBigDecimal("transaction_amount"), results.getDate("transaction_date"));
				transactions.add(transaction);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return transactions;
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
	public void add(ExpenseTransaction transaction) {
		
		String insertSql = "INSERT INTO TRANSACTION (transaction_name, transaction_amount, transaction_date) VALUES (?, ?, ?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, transaction.getTransactionName());
			ps.setBigDecimal(2, transaction.getTransactionAmount());
			ps.setDate(3, transaction.getTransactionDate());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	
	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM TRANSACTION WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}


}
