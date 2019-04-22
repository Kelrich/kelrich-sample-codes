import React, { Component } from 'react';
import "../css/header.css";

class Header extends Component {
     
        render(){
        return(
            <div className='header'>
            <div className='title'>
                Expense Tracking System
            </div>
            <div className='navigation'>
                <ul>
                <li value="0" className="header-list active"><a href="#home">HOME</a></li>
                <li value="1" className="header-list"><a href="#expenses">EXPENSES</a></li>
                <li value="2" className="header-list"><a href="#budget">BUDGET</a></li>
                </ul>
            </div>
            </div>
        );
    }
}

export default Header;