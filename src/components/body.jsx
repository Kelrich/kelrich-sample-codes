import React, { Component } from 'react';
import SidebarL from '../components/sidebar-left.jsx';
import Forms from '../components/form.jsx';
//import SidebarR from '../components/sidebar-right.jsx';
import '../css/body.css';

class Body extends Component {
    
    render() {
        return(
            <div className='body'>
                <SidebarL/>
                <Forms/>

            </div>
        );
    }
}
export default Body;