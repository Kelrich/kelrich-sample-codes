import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../css/form.css';

class Forms extends Component {
    
    render() {
    const { categories } = this.props;
    return(
    <Fragment>
            <div className="form-container1">
            {/* expense options form */}
            <form className="form-options1">
            <link rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                  integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                  crossorigin="anonymous"/>
            <br/><br/>OPTIONS
            <br/><br/>
            <button className="options" onClick={this.props.handleViewCategories}><i class="far fa-eye"></i> VIEW CATEGORIES</button>
            <button className="options" onClick={this.props.handleViewTransactions}><i class="fas fa-eye"></i> VIEW TRANSACTIONS</button>
            </form>
            {/* budget options form */}
            <form className="form-options2">
            <link rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                  integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                  crossorigin="anonymous"/>
            <br/><br/>OPTIONS
            <br/><br/>
            <button className="options" onClick={this.props.handleViewAllBudget}><i class="far fa-eye"></i> VIEW MONTHLY BUDGET</button>
            </form>
            </div>
            
            {/* add buttons for category, transaction and budget */}
            <button className="addcat" onClick={this.props.openAddCategory}><i class="far fa-plus-square"></i> ADD CATEGORY</button>
            <button className="addtrans" onClick={this.props.openAddTransaction}><i class="far fa-plus-square"></i> ADD TRANSACTION</button>
            <button className="addbud" onClick={this.props.openSetBudget}><i class="far fa-plus-square"></i> SET MONTHLY BUDGET</button>

            {/* expense navigation bar */}
            <div className="form-container2">
            <a class="closebtn" onClick={this.props.closeAdd}>&times;</a>
                {/* add category form */}
                <form className='form-category'>
                ADD A NEW CATEGORY
                <br/><br/><br/>
                CATEGORY NAME:<input className="category-name" onChange={this.props.inputCategory} type="text" name="categoryname" placeholder="Category Name..."/><br/>
                <button className="add" onClick={this.props.postCategory}><i class="far fa-plus-square"></i> ADD CATEGORY</button><br/>
                </form>
                {/* add transaction form */}
                <form className='form-transaction'>
                ADD A NEW TRANSACTION
                <br/><br/><br/>
                SELECT CATEGORY: <br/>
                <select className="selected" onChange={this.props.handleChange}>
                { (categories && categories.length > 0) && categories.map((category) => {
                return (<option className="select1" value={category.categoryName}> {category.categoryName}</option>);
                })}
                </select><br/>
                ENTER AMOUNT: <br/>
                <input className="transaction-amount" type="text" name="transactionamount" placeholder="Amount..."/><br/>
                <button onClick={this.props.postTransaction} className="add"><i class="fas fa-plus-square"></i> ADD TRANSACTION</button>
                </form>
                {/* set budget form */}
                <form className='form-budget'>
                SET MONTHLY BUDGET
                <br/><br/>
                SELECT CATEGORY: <br/>
                <select className="selected" onChange={this.props.handleChange}>
                { (categories && categories.length > 0) && categories.map((category) => {
                return (<option className="select" value={category.categoryName}> {category.categoryName}</option>);
                })}
                </select><br/>
                ENTER AMOUNT: <br/>
                <input className="budget-amount" type="text" name="jan" placeholder="JAN"/>
                <input className="budget-amount" type="text" name="feb" placeholder="FEB"/>
                <input className="budget-amount" type="text" name="mar" placeholder="MAR"/>
                <input className="budget-amount" type="text" name="apr" placeholder="APR"/>
                <input className="budget-amount" type="text" name="may" placeholder="MAY"/>
                <input className="budget-amount" type="text" name="jun" placeholder="JUN"/>
                <input className="budget-amount" type="text" name="jul" placeholder="JUL"/>
                <input className="budget-amount" type="text" name="aug" placeholder="AUG"/>
                <input className="budget-amount" type="text" name="sep" placeholder="SEP"/>
                <input className="budget-amount" type="text" name="oct" placeholder="OCT"/>
                <input className="budget-amount" type="text" name="nov" placeholder="NOV"/>
                <input className="budget-amount" type="text" name="dec" placeholder="DEC"/>
                <button onClick={this.props.putBudget} className="add"><i class="fas fa-plus-square"></i> SET BUDGET</button>
                </form>
            </div>
          </Fragment>            
        );
    }
}
Forms.propTypes = {
    inputCategory: PropTypes.func,
    postCategory: PropTypes.func,
    postTransaction: PropTypes.func,
    putBudget: PropTypes.func,
    openAddCategory: PropTypes.func,
    openAddTransaction: PropTypes.func,
    openSetBudget: PropTypes.func,
    closeAdd: PropTypes.func,
    handleChange: PropTypes.func,
    handleViewCategories: PropTypes.func,
    handleViewTransactions: PropTypes.func,
    handleViewAllBudget: PropTypes.func,
    handleOptionChange: PropTypes.func,
    categories: PropTypes.func
}

export default Forms;