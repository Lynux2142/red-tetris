import React, { Component, Fragment } from 'react';
import './customers.css';

class Customers extends Component {
  state = {
    customers: []
  }
  componentDidMount() {
    fetch('/api/customers').then(res => res.json()).then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)))
  }
  render() {
    return (
      <Fragment>
        <h2>Customers</h2>
        <ul>
          {
            this.state.customers.map(customer => {
              if (customer) {
                return (<li key={customer.id}>{customer.firstname} {customer.lastname}</li>);
              } else {
                return (null);
              }
            })
          }
        </ul>
      </Fragment>
    );
  }
}

export default Customers;
