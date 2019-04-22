import React, { Component } from 'react';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import './App.css';
import { getExpenseCategory } from './util/service-helper';
import { Table } from './components/table.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      categoryList: [],
    };
  }

  componentDidMount(){
    this.getCategory();
    this.getActive();
  }

  componentWillUnmount(){
  }

  getCategory() {
    getExpenseCategory().then(res => {
      this.setState({categoryList : res.data});
    })
  }

  getActive() {
      let btns = document.getElementsByClassName("header-list");
      let sbartitle = document.getElementsByClassName("sidebar-title");
      let sbarlist = document.getElementsByClassName("sidebar-list");
      
      for (var i = 0; i < btns.length; i++) {
         btns[i].addEventListener("click", function() {
             var current = document.getElementsByClassName("active");
             current[0].className = current[0].className.replace(" active", "");
             this.className += " active";
             
      switch(current[0].value){
           case 1:  //  EXPENSES
             sbartitle[0].innerHTML = sbartitle[0].innerHTML.replace(sbartitle[0].innerHTML, 'EXPENSES');
             sbarlist[0].innerHTML = sbarlist[0].innerHTML.replace(sbarlist[0].innerHTML, 'EXPENSE CATEGORIES');
             sbarlist[1].innerHTML = sbarlist[1].innerHTML.replace(sbarlist[1].innerHTML, 'EXPENSE TRANSACTIONS');
             sbarlist[2].innerHTML = sbarlist[2].innerHTML.replace(sbarlist[2].innerHTML, 'EXPENSE REPORTS');
                break;
           case 2:  //  BUDGET
             sbartitle[0].innerHTML = sbartitle[0].innerHTML.replace(sbartitle[0].innerHTML, 'BUDGET');
             sbarlist[0].innerHTML = sbarlist[0].innerHTML.replace(sbarlist[0].innerHTML, 'BUDGET CATEGORIES');
             sbarlist[1].innerHTML = sbarlist[1].innerHTML.replace(sbarlist[1].innerHTML, 'SET MONTHLY BUDGET');
             sbarlist[2].innerHTML = sbarlist[2].innerHTML.replace(sbarlist[2].innerHTML, 'MONTHLY BUDGET REPORT');
                break;
           default: //  HOME
             sbartitle[0].innerHTML = sbartitle[0].innerHTML.replace(sbartitle[0].innerHTML, 'HOME');  
             sbarlist[0].innerHTML = sbarlist[0].innerHTML.replace(sbarlist[0].innerHTML, 'WELCOME');
             sbarlist[1].innerHTML = sbarlist[1].innerHTML.replace(sbarlist[1].innerHTML, 'ABOUT');
             sbarlist[2].innerHTML = sbarlist[2].innerHTML.replace(sbarlist[2].innerHTML, 'CONTACT US');
        }
            });
        }
  }

  render() {
    
    console.log('CATEGORY LIST: ');
    console.log(this.state.categoryList);

    return (
      <div className="App">
        <Header/>
        <Body/>
        <div className='table'>
          <Table categoryList={this.state.categoryList}/>
        </div>
      </div>
    );
  }
}

export default App;
