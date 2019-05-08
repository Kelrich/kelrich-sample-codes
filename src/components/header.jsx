import React, { Component } from 'react';
import "../css/header.css";

class Header extends Component {

        render(){
        return(
            <div className='header'>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                                       integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                                       crossorigin="anonymous"/>
            <div>
                <li className="title">Expense Tracking System</li>
            </div>
            <div className='navigation'>
                <ul className='nav'>
                <li value="0" className="header-list active"><i class="fas fa-home"></i> HOME</li>
                <li value="1" className="header-list"><i class="fas fa-coins"></i> EXPENSES</li>
                <li value="2" className="header-list"><i class="fas fa-wallet"></i> BUDGET</li>
                </ul>
            </div>
            </div>
        );
    }
}

export default Header;