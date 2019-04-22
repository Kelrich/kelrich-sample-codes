import React, { Component } from 'react';
import '../css/sidebar-left.css';

class SidebarL extends Component {
    render() {
        return (
            <div className="sidebar-left">
                <li className="sidebar-title">HOME</li>
                <li className="sidebar-list">WELCOME</li>
                <li className="sidebar-list">ABOUT</li>
                <li className="sidebar-list">CONTACT US</li>
            </div>
        );
    }
}

export default SidebarL;