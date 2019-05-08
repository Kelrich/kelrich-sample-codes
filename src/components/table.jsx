import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../css/table.css';

class Table extends Component {

    render() {
        return(
            <Fragment>
                    
                    <div className="container">

                        {/* category table */}
                        <div className='expense-category'>    
                            <table className="expense-category-table">
                                <tr className="expense-category-th">
                                <th>ID</th>
                                <th>CATEGORY</th>
                                <th>BUDGET AMOUNT</th>
                                </tr>
                            <tbody>
                                {
                                    this.props.categoryList.map((category) => {
                                    return (
                                    <tr className="expense-category-tr">
                                    <th className="id">{category.id}</th>
                                    <th className="category">{category.categoryName}</th>
                                    <th className="amount"><button className="view" onClick={this.props.handleViewBudget} value={category.categoryName}><i class="fas fa-search-dollar"></i> VIEW BUDGET</button></th></tr>   
                                    )})
                                }
                            </tbody></table>
                        </div>
                                    {/* modal */}
                                    <div class="modal fade" id="myModal" role="dialog">
                                    <div class="modal-dialog">                  
                                        <div class="modal-content">
                                        <div class="modal-header">
                                        <button type="button" className="close1" onClick={this.props.handleClose}><i class="fas fa-times"></i></button>
                                        <h4 class="modal-title">BUDGET REPORT</h4>
                                        </div>
                                        <div class="column">
                                        <div class="modal-left">
                                        <div className="budget-overview">BUDGET OVERVIEW</div>
                                        <select onChange={this.props.handleCurrent} className="current">
                                                <option selected>Current Year</option>
                                                <option>Current Month</option> 
                                        </select>
                
                                            <div className="report-y">
                                            BUDGET AMOUNT<br/><br/>
                                            <label className="total-budget"></label><br/><br/>
                                            REMAINING BUDGET<br/><br/>
                                            <label className="remaining-budget"></label><br/><br/>
                                            EXCESS EXPENSE<br/><br/>
                                            <label className="excess-expense"></label>
                                            </div>

                                            <div className="report-m">
                                            BUDGET AMOUNT<br/><br/>
                                            <label className="total-budget-m"></label><br/><br/>
                                            REMAINING BUDGET<br/><br/>
                                            <label className="remaining-budget-m"></label><br/><br/>
                                            EXCESS EXPENSE<br/><br/>
                                            <label className="excess-expense-m"></label>
                                            </div>
                                            
                                        </div>

                                        <div class="modal-right">
                                        EXPENDITURES OVERVIEW
                                            <div className="report-2">
                                            <table className="expense-report-table">
                                            <tr className="expense-report-th">
                                            <th>TRANSACTION AMOUNT</th>
                                            <th>TRANSACTION DATE</th>
                                            </tr>
                                            <tbody>
                                {
                                    this.props.expenseList.map((expense) => {
                                    return (
                                    <tr className="expense-report-tr">
                                    <th className="amount">{expense.transactionAmount}</th>
                                    <th className="date">{expense.transactionDate}</th>
                                    </tr>
                                    )})
                                }
                            </tbody>
                                  </table>
                                </div>
                                    <div className="total-expenditures">TOTAL EXPENDITURES: <label className="total-expense"></label>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div id="modal-backdrop" class="modal-backdrop-transparent modal-transition"></div>
                

                        {/* transaction table */}
                        <div className="expense-transaction">
                            <table className="expense-transaction-table">
                                <tr className="expense-transaction-th">
                                <th>ID</th>
                                <th>CATEGORY</th>
                                <th>TRANSACTION AMOUNT</th>
                                <th>TRANSACTION DATE</th>
                                </tr>
                            <tbody>
                                {
                                    this.props.transactionList.map((transaction) => {
                                    return (
                                    <tr className="expense-transaction-tr">
                                    <th className="id">{transaction.id}</th>
                                    <th className="category">{transaction.transactionName}</th>
                                    <th className="amount">{transaction.transactionAmount}</th>
                                    <th className="date">{transaction.transactionDate}</th>
                                    </tr>
                                    )})
                                }
                            </tbody></table>
                        </div>

                        {/* budget table */}
                        <div className="expense-budget">
                            <table className="expense-budget-table">
                                <tr className="expense-budget-th">
                                <th>CATEGORY</th>
                                <th>JAN</th> <th>FEB</th> <th>MAR</th> <th>APR</th>
                                <th>MAY</th> <th>JUN</th> <th>JUL</th> <th>AUG</th>
                                <th>SEP</th> <th>OCT</th> <th>NOV</th> <th>DEC</th>
                                </tr>
                            <tbody>
                                {
                                    this.props.budgetList.map((budget) => {
                                    return (
                                    <tr className="expense-budget-tr">
                                    <th className="category">{budget.budgetCategory}</th>
                                    <th className="month">{budget.jan}</th>
                                    <th className="month">{budget.feb}</th>
                                    <th className="month">{budget.mar}</th>
                                    <th className="month">{budget.apr}</th>
                                    <th className="month">{budget.may}</th>
                                    <th className="month">{budget.jun}</th>
                                    <th className="month">{budget.jul}</th>
                                    <th className="month">{budget.aug}</th>
                                    <th className="month">{budget.sep}</th>
                                    <th className="month">{budget.oct}</th>
                                    <th className="month">{budget.nov}</th>
                                    <th className="month">{budget.dec}</th>
                                    </tr>
                                    )})
                                }
                            </tbody></table>
                        </div>
                </div>
            </Fragment>
        );
    }
}

Table.propTypes = {
    categoryList: PropTypes.func,
    transactionList: PropTypes.func,
    expenseList: PropTypes.func,
    budgetList: PropTypes.func,
    getExpense: PropTypes.func,
    getTransaction: PropTypes.func,
    removeTransaction: PropTypes.func,
    getCategory: PropTypes.func,
    getBudget: PropTypes.func,
    handleViewBudget: PropTypes.func,
    handleClose: PropTypes.func,
    handleCurrent: PropTypes.func,
}

export {
    Table
}