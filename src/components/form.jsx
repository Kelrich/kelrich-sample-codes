import React, { Component, Fragment } from 'react';
//import PropTypes from 'prop-types';
import '../css/form.css';

class Forms extends Component {
    render() {
        return(
            <Fragment>
                <form>
                    <li className='form-title'>ADD ANOTHER CATEGORY</li>
                    <br/><label className='form-name'>CATEGORY NAME:</label><br/>
                    <br/><input type="text" name="categoryname" placeholder="Category Name"/><br/>
                    <br/><button type="button">ADD CATEGORY</button>
                </form>
            </Fragment>
        );
    }
}

export default Forms;