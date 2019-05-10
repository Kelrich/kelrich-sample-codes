import React, { Component } from 'react';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import Forms from './components/form.jsx';
import './App.css';
import { getExpenseCategory, getExpenseTransaction, getExpenseBudget } from './util/service-helper';
import axios from 'axios';
import { Table } from './components/table.jsx';

class App extends Component {
  
  constructor(props) {
  super(props);

    this.state = {
    categoryList : [],
    categoryName : '',
    
    transactionList : [],
    transactionName : '',
    transactionAmount : '',
    transactionDate : '',
    
    budgetList : [],
    budgetAmount : [],
    budgetView : [],

    expenseList: [],
    totalExpense: [],
    totalBudget: [],
    currentBudget: [],
    remainingBudget: [],
    excessExpense: [],
    excessCurrent: [],
    remainingCurrent: []
  }
  }

  componentDidMount() {
  this.getCategory();
  this.getTransaction();
  this.getBudget();
  this.getActiveHeader();
  }

  getCategory() {
  getExpenseCategory().then(res => {
  this.setState({categoryList : res.data});
  });
  }

  getTransaction() {
  getExpenseTransaction().then(res => {
  this.setState({transactionList : res.data});
  });
  }

  removeTransaction() {
  for (let i = 0; i < 3; i++) {
  axios.delete('http://localhost:8080/restsample01/rest/transactions?id=' + i)
  .then(res => {
    console.log(res.data);
    this.getTransaction();
  });}
  }

  getBudget() {
  getExpenseBudget().then(res => {
  this.setState({budgetList : res.data});
  });
  }

  inputCategory = e => {
  this.setState({categoryName : e.target.value.toUpperCase()});
  }

  postCategory = e => {
  e.preventDefault();
  let str = this.state.categoryName.toUpperCase();
  if (!this.state.categoryName) { alert('No input! Try again.'); }
  else {
  let map = this.state.categoryList.map((x => x.categoryName));
  if (map.includes(str)) { alert('Category already exists!'); }
  else {
  let data1 = { categoryName : this.state.categoryName }
  let data2 = { budgetCategory : this.state.categoryName,
                jan : 1000, feb : 1000, mar : 1000, apr : 1000, may : 1000, jun : 1000,
                jul : 1000, aug : 1000, sep : 1000, oct : 1000, nov : 1000, dec : 1000 }
  let headers = { 'Content-Type' : 'application/json' }
  axios.post('http://localhost:8080/restsample01/rest/categories', data1, {headers : headers})
  .then(res => {
  alert(res.data);
  this.getCategory();
  });

  axios.post('http://localhost:8080/restsample01/rest/budget', data2, {headers : headers})
  .then(res => {
  alert(res.data);
  this.getBudget();
  });

  }}
  }

  postTransaction = e => {
    e.preventDefault();
    let opt;
    let sel = document.getElementsByClassName("select1");
    let amount = document.getElementsByClassName("transaction-amount")[0].value;
    for (var i = 0; i < sel.length; i++){
      if (sel[i].selected === true) {
      opt = sel[i].value;
    }}

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.setState({transactionDate: date});
    
  if (amount === null) {
    alert("No input! Please try again.");
  } else {
    this.setState({transactionAmount : amount});
    let data = {
    transactionName : opt,
    transactionAmount : this.state.transactionAmount,
    transactionDate : this.state.transactionDate
  }
  let headers = { 'Content-Type' : 'application/json' }
  axios.post('http://localhost:8080/restsample01/rest/transactions', data, {headers : headers})
  .then(res => {
  alert(res.data);
  this.getTransaction();
  });}
  }
  

  putBudget = e => {
  this.setState({budgetAmount : []});
  e.preventDefault();
  let opt;
  let sel = document.getElementsByClassName("select");
  let input = document.getElementsByClassName("budget-amount");
  let hi;
  
  for (var i = 0; i < sel.length; i++){
    if (sel[i].selected === true) {
      opt = sel[i].value;
  }}
  
  for (var a = 0; a < input.length; a++) {
    hi = input[a].value;
    this.state.budgetAmount.push(hi);
  }
  
  if (this.state.budgetAmount.includes("")){
    alert("Please complete all data!");
  }else{
        let data = {
        budgetCategory : opt,
        jan : this.state.budgetAmount[0],
        feb : this.state.budgetAmount[1],
        mar : this.state.budgetAmount[2],
        apr : this.state.budgetAmount[3],
        may : this.state.budgetAmount[4],
        jun : this.state.budgetAmount[5],
        jul : this.state.budgetAmount[6],
        aug : this.state.budgetAmount[7],
        sep : this.state.budgetAmount[8],
        oct : this.state.budgetAmount[9],
        nov : this.state.budgetAmount[10],
        dec : this.state.budgetAmount[11],
      }
        let headers = {
        'Content-Type' : 'application/json'
      }
      axios.put('http://localhost:8080/restsample01/rest/budget', data, {header: headers})
      .then(res => {
        alert(res.data);
      });
        
      
    }
    axios.get('http://localhost:8080/restsample01/rest/budget?budgetCategory=' + opt)
    .then(res => {
      this.setState({budgetList : res.data});  
      axios.get('http://localhost:8080/restsample01/rest/budget?budgetCategory=' + opt)
      .then(res => {
        this.setState({budgetList : res.data});
      });  
    });
    
    }
  
    
  getActiveHeader() {
  let btns = document.getElementsByClassName("header-list");
  let title1 = document.getElementsByClassName("expenses");
  let title2 = document.getElementsByClassName("budget");
  let title3 = document.getElementsByClassName("body-title");
  let title4 = document.getElementsByClassName("home");
  let title5 = document.getElementsByClassName("info");
  let table = document.getElementsByClassName("container");
  let form = document.getElementsByClassName("form-container1");
  let option1 = document.getElementsByClassName("form-options1");
  let option2 = document.getElementsByClassName("form-options2");
  let nav = document.getElementsByClassName("form-container2");
  let addcat = document.getElementsByClassName("addcat");
  let addtrans = document.getElementsByClassName("addtrans");
  let addbud = document.getElementsByClassName("addbud");

  for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
    
  switch(current[0].value){
  case 1:   // -- EXPENSES
  title1[0].style.display = "block";
  title2[0].style.display = "none";
  title3[0].style.display = "none";
  title3[0].style.marginLeft = "0";
  title4[0].style.display = "none";
  title5[0].style.display= "none";
  form[0].style.display = "block";
  option1[0].style.display = "block";
  option2[0].style.display = "none";
  table[0].style.display = "none";
  nav[0].style.width = "0";
  addcat[0].style.display = "none";
  addtrans[0].style.display = "none";
  addbud[0].style.display = "none";
  table[0].style.width = "64%";
  table[0].style.marginLeft = "0";
  break;
  case 2:   // -- BUDGET
  title1[0].style.display = "none";
  title2[0].style.display = "block";
  title3[0].style.display = "none";
  title3[0].style.marginLeft = "0";
  title4[0].style.display = "none";
  title5[0].style.display= "none";
  table[0].style.display = "none";
  table[0].style.marginLeft = "0";
  table[0].style.width = "64%";
  form[0].style.display = "block";
  option1[0].style.display = "none";
  option2[0].style.display = "block";
  nav[0].style.width = "0";
  addcat[0].style.display = "none";
  addtrans[0].style.display = "none";
  addbud[0].style.display = "none";
  break;
  default:  // -- HOME
  title1[0].style.display = "none";
  title2[0].style.display = "none";
  title3[0].style.display = "none";
  title3[0].style.marginLeft = "0";
  title4[0].style.display = "block";
  title5[0].style.display= "block";
  table[0].style.display = "none";
  table[0].style.marginLeft = "0";
  table[0].style.width = "64%";
  form[0].style.display = "none";
  nav[0].style.width = "0";
  addcat[0].style.display = "none";
  addtrans[0].style.display = "none";
  addbud[0].style.display = "none";
}});}
  }

  handleCurrent = e => {
    
    if (e.target.value === "Current Year") {
      document.getElementsByClassName("report-y")[0].style.display = "block";
      document.getElementsByClassName("report-m")[0].style.display = "none";
    } else {
      document.getElementsByClassName("report-m")[0].style.display = "block";
      document.getElementsByClassName("report-y")[0].style.display = "none";
    }
  
  }

  handleViewBudget = e => {
  let bud = document.getElementsByClassName("total-budget");
  let mon = document.getElementsByClassName("total-budget-m");
  let exp = document.getElementsByClassName("total-expense")
  let rem = document.getElementsByClassName("remaining-budget");
  let monrem = document.getElementsByClassName("remaining-budget-m");
  let exc = document.getElementsByClassName("excess-expense");
  let monexc = document.getElementsByClassName("excess-expense-m");
  let value = e.target.value;

  document.getElementById("myModal").style.display = "block";
  document.getElementsByClassName("modal-backdrop-transparent")[0].style.display = "block";
  document.getElementsByClassName("form-container2")[0].style.width = "0";
  document.getElementsByClassName("body-title")[0].style.marginLeft = "0";
  document.getElementsByClassName("container")[0].style.marginLeft = "0";
  document.getElementsByClassName("container")[0].style.width = "64%";
  
  // get total budget, remaining budget, and excess expense amount
    axios.get('http://localhost:8080/restsample01/rest/budget?budgetCategory=' + value)
    .then(res => {
    this.setState({totalBudget : []});
    this.setState({currentBudget : []});
    this.setState({budgetView : res.data});
    
    // all budget
    this.state.budgetView.map((budget => {
    return (
    this.state.totalBudget.push(budget.jan, budget.feb, budget.mar, budget.apr, budget.may, budget.jun, budget.jul, budget.aug, budget.sep, budget.oct, budget.nov, budget.dec)
    )}))
    // current month
    this.state.budgetView.map((budget => {
    return (
    this.state.currentBudget.push(budget.may)
    )}))
    
    try {
    const totalBudget = this.state.totalBudget.reduce((total, currentValue) => {
    return total + currentValue;});
    this.setState({totalBudget: totalBudget});
    bud[0].innerHTML = bud[0].innerHTML.replace(bud[0].innerHTML, this.state.totalBudget);
    mon[0].innerHTML = mon[0].innerHTML.replace(mon[0].innerHTML, this.state.currentBudget);
    } catch (error) {
      console.log(error);
    }
    // get total expenditures
    axios.get('http://localhost:8080/restsample01/rest/transactions?transactionName=' + value)
    .then(res => {
    this.setState({totalExpense : []});
    this.setState({expenseList : res.data});
    this.state.expenseList.map((expense => {
    return (
    this.state.totalExpense.push(expense.transactionAmount))  
    }));
    try {
      const totalExpense = this.state.totalExpense.reduce((total,currentValue) => {
      return total + currentValue;});
      this.setState({totalExpense : totalExpense});
      exp[0].innerHTML = exp[0].innerHTML.replace(exp[0].innerHTML, this.state.totalExpense);
      } catch (error) {
        console.log(error);
      }
      
    // condition if Expenditures > or < than Budget
    if (this.state.totalExpense > this.state.totalBudget) {
      this.setState({excessExpense: []});
      rem[0].innerHTML = rem[0].innerHTML.replace(rem[0].innerHTML, "0");
      this.state.excessExpense.push(this.state.totalExpense, this.state.totalBudget);
      const excessExpense = this.state.excessExpense.reduce((total, currentValue) => {
      return total - currentValue;});
      this.setState({excessExpense: excessExpense});
      exc[0].innerHTML = exc[0].innerHTML.replace(exc[0].innerHTML, this.state.excessExpense);
      exc[0].style.backgroundColor = "pink"; 
    } else {
      this.setState({remainingBudget: []});
      exc[0].innerHTML = exc[0].innerHTML.replace(exc[0].innerHTML, "0");
      this.state.remainingBudget.push(this.state.totalBudget, this.state.totalExpense);
      const remainingBudget = this.state.remainingBudget.reduce((total, currentValue) => {
      return total - currentValue;});
      this.setState({remainingBudget: remainingBudget});
      rem[0].innerHTML = rem[0].innerHTML.replace(rem[0].innerHTML, this.state.remainingBudget);
      exc[0].style.backgroundColor = "lightgreen";
    }
    if (this.state.totalExpense > this.state.currentBudget) {
      this.setState({excessCurrent: []});
      monrem[0].innerHTML = monrem[0].innerHTML.replace(monrem[0].innerHTML, "0");
      this.state.excessCurrent.push(this.state.totalExpense, this.state.currentBudget);
      const excessCurrent = this.state.excessCurrent.reduce((total, currentValue) => {
      return total - currentValue;});
      this.setState({excessCurrent: excessCurrent});
      monexc[0].innerHTML = monexc[0].innerHTML.replace(monexc[0].innerHTML, this.state.excessCurrent);
      monexc[0].style.backgroundColor = "pink";
    } else {
      this.setState({remainingCurrent: []});
      monexc[0].innerHTML = monexc[0].innerHTML.replace(monexc[0].innerHTML, "0");
      this.state.remainingCurrent.push(this.state.currentBudget, this.state.totalExpense);
      const remainingCurrent = this.state.remainingCurrent.reduce((total, currentValue) => {
      return total - currentValue;});
      this.setState({remainingCurrent: remainingCurrent});
      monrem[0].innerHTML = monrem[0].innerHTML.replace(monrem[0].innerHTML, this.state.remainingCurrent);
      monexc[0].style.backgroundColor = "lightgreen";
    }



  }); 
  });
}


handleViewAllBudget = e => {
  e.preventDefault();
  this.getBudget();
  let title = document.getElementsByClassName("body-title");
  title[0].style.display = "block";
  title[0].innerHTML = title[0].innerHTML.replace(title[0].innerHTML, "MONTHLY BUDGET");
  document.getElementsByClassName("container")[0].style.display = "block";
  document.getElementsByClassName("expense-category")[0].style.display = "none";
  document.getElementsByClassName("expense-transaction")[0].style.display = "none";
  document.getElementsByClassName("expense-budget")[0].style.display = "block";
  document.getElementsByClassName("addcat")[0].style.display = "none";
  document.getElementsByClassName("addtrans")[0].style.display = "none";
  document.getElementsByClassName("addbud")[0].style.display = "block";
}

handleClose = () => {
  document.getElementById("myModal").style.display = "none";
  document.getElementsByClassName("modal-backdrop-transparent")[0].style.display = "none";
}

handleViewCategories = e => {
  e.preventDefault();
  let title = document.getElementsByClassName("body-title");
  title[0].style.display = "block";
  title[0].innerHTML = title[0].innerHTML.replace(title[0].innerHTML, "EXPENSE CATEGORIES");
  document.getElementsByClassName("container")[0].style.display = "block";
  document.getElementsByClassName("expense-category")[0].style.display = "block";
  document.getElementsByClassName("expense-transaction")[0].style.display = "none";
  document.getElementsByClassName("expense-budget")[0].style.display = "none";
  document.getElementsByClassName("addcat")[0].style.display = "block";
  document.getElementsByClassName("addtrans")[0].style.display = "none";
  document.getElementsByClassName("addbud")[0].style.display = "none";
}

  handleViewTransactions = e => {
  e.preventDefault();
  let title = document.getElementsByClassName("body-title");
  title[0].style.display = "block";
  title[0].innerHTML = title[0].innerHTML.replace(title[0].innerHTML, "EXPENSE TRANSACTIONS");
  document.getElementsByClassName("container")[0].style.display = "block";
  document.getElementsByClassName("expense-category")[0].style.display = "none";
  document.getElementsByClassName("expense-transaction")[0].style.display = "block";
  document.getElementsByClassName("expense-budget")[0].style.display = "none";
  document.getElementsByClassName("addcat")[0].style.display = "none";
  document.getElementsByClassName("addtrans")[0].style.display = "block";
  document.getElementsByClassName("addbud")[0].style.display = "none";
  }

  handleChange = e => {
  this.setState({categories: e.target.categories});
  let opt;
  let sel = document.getElementsByClassName("select");
  for (var i = 0; i < sel.length; i++){
  if (sel[i].selected === true) {
  opt = sel[i].value;
  }}

  axios.get('http://localhost:8080/restsample01/rest/budget?budgetCategory=' + opt)
  .then(res => {
  this.setState({budgetList : res.data});
  });
  }
    

  openAddCategory = e => {
  e.preventDefault();
  document.getElementsByClassName("form-category")[0].style.display = "block";
  document.getElementsByClassName("form-transaction")[0].style.display = "none";
  document.getElementsByClassName("form-budget")[0].style.display = "none";
  document.getElementsByClassName("form-container2")[0].style.width = "34%";
  document.getElementsByClassName("container")[0].style.marginLeft = "8%";
  document.getElementsByClassName("body-title")[0].style.marginLeft = "11%";
  document.getElementsByClassName("container")[0].style.width = "58%";
  }

  openAddTransaction = e => {
  e.preventDefault();
  document.getElementsByClassName("form-category")[0].style.display = "none";
  document.getElementsByClassName("form-transaction")[0].style.display = "block";
  document.getElementsByClassName("form-budget")[0].style.display = "none";
  document.getElementsByClassName("form-container2")[0].style.width = "34%";
  document.getElementsByClassName("body-title")[0].style.marginLeft = "11%";
  document.getElementsByClassName("container")[0].style.marginLeft = "8%";
  document.getElementsByClassName("container")[0].style.width = "58%";
  }

  openSetBudget = e => {
  e.preventDefault();
  document.getElementsByClassName("form-category")[0].style.display = "none";
  document.getElementsByClassName("form-transaction")[0].style.display = "none";
  document.getElementsByClassName("form-budget")[0].style.display = "block";
  document.getElementsByClassName("form-budget")[0].style.display = "block";
  document.getElementsByClassName("form-container2")[0].style.width = "34%";
  document.getElementsByClassName("body-title")[0].style.marginLeft = "11%";
  document.getElementsByClassName("container")[0].style.marginLeft = "8%";
  document.getElementsByClassName("container")[0].style.width = "58%";
  }
  
  closeAdd = e => {
  e.preventDefault();
  document.getElementsByClassName("form-container2")[0].style.width = "0";
  document.getElementsByClassName("body-title")[0].style.marginLeft = "0";
  document.getElementsByClassName("container")[0].style.width = "64%";
  document.getElementsByClassName("container")[0].style.marginLeft = "0";
  document.getElementsByClassName("form-category")[0].style.display = "none";
  document.getElementsByClassName("form-transaction")[0].style.display = "none";
  }

  render() {
  return (

  <div className="App">
    <Header/>
    <Body/>
    <Forms
    categories={this.state.categoryList}
    inputCategory={this.inputCategory}
    postCategory={this.postCategory}
    postTransaction={this.postTransaction}
    putBudget={this.putBudget}
    openAddCategory={this.openAddCategory}
    openAddTransaction={this.openAddTransaction}
    openSetBudget={this.openSetBudget}
    closeAdd={this.closeAdd}
    handleChange={this.handleChange}
    handleViewCategories={this.handleViewCategories}
    handleViewTransactions={this.handleViewTransactions}
    handleViewAllBudget={this.handleViewAllBudget}
    />
    <Table
    categoryList={this.state.categoryList}
    transactionList={this.state.transactionList}
    expenseList={this.state.expenseList}
    budgetList={this.state.budgetList}
    handleViewBudget={this.handleViewBudget}
    handleClose={this.handleClose}
    handleCurrent={this.handleCurrent}
    />
</div>    
);}
}

export default App;
