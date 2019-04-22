import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../css/table.css';
import { transcode } from 'buffer';

class Table extends Component {

    render() {
        return(
            <Fragment>
                <table className="expense-category-table">
                <thead></thead>
                    <tr className="expense-category-th">
                        <th>ID</th>
                        <th>CATEGORY</th>
                    </tr>
                <tbody>
                    {
                        this.props.categoryList.map((category, index) => {
                            return (
                                <tr className="expense-category-tr">
                                    <th className="id">{category.id}</th>
                                    <th  className="category" ref="#cat">{category.categoryName}</th>
                                </tr>
                            )
                        })
                    }
                        </tbody></table>
            </Fragment>
        );
    }
}

Table.propTypes = {
    categoryList: PropTypes.func
}

export {
    Table
}