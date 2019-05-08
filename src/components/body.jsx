import React, { Component } from 'react';
import '../css/body.css';

class Body extends Component {
    
    render() {
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                                       integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                                       crossorigin="anonymous"/>
                <div className="expenses">
                <i class="fas fa-coins e"></i>EXPENSES
                </div>
                <div className="budget">
                <i class="fas fa-wallet b"></i>BUDGET
                </div>
                <div className="home">
                <i class="fas fa-search-dollar h"></i>EXPENSE TRACKING SYSTEM
                <label className="info">Track your expenses. Manage your budget better.</label>
                </div>
                <div className='body-title'>
                EXPENSE CATEGORIES
                </div>
            </div>
        );
    }
}

export default Body;