import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import store, { fetchContacts, setLoading } from './store';
import ContactList from './ContactList';
import Loader from './Loader';
import Nav from './Nav';


class _Main extends React.Component {
  async componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    const { contacts, loading } = this.props;
    return (
      <div id="main">
        <Nav />
        <div id="container">
        { loading ? <Loader /> : <ContactList />}
        </div>
        <Nav />
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return state;
};

const mapDispatchToProps = (dispatch)=> {
  return {
    bootstrap: async()=> {
      dispatch(fetchContacts());
    }
  };
};
const Main = connect(mapStateToProps, mapDispatchToProps)(_Main);


ReactDOM.render(<Provider store={ store }><Main /></Provider>, document.getElementById('app'));
