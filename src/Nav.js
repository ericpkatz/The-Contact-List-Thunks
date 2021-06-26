import React from 'react';
import { connect } from 'react-redux';
console.log('hello');

const Nav = ({ count })=> {
  return (
    <div id="navbar">
      <div>Contact List ({ count } favorites!)</div>
    </div>
  );
};

const mapStateToProps = ({ contacts, loading })=> {
  return {
    count: contacts.filter( contact => contact.favorite ).length
  };
};

export default connect(mapStateToProps)(Nav);


