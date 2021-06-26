import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';


const contactsReducer = (state = [], action)=> {
  if(action.type === 'SET_CONTACTS'){
    return action.contacts;
  }
  if(action.type === 'UPDATE_CONTACT'){
    return state.map( contact => contact.id === action.contact.id ? action.contact : contact); 
  }
  return state;
};

const loadingReducer = (state = true, action)=> {
  if(action.type === 'SET_LOADING'){
    return action.loading;
  }
  return state;
};

const reducer = combineReducers({
  loading: loadingReducer,
  contacts: contactsReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const setContacts = (contacts)=> {
  return {
    type: 'SET_CONTACTS',
    contacts
  };
};

export const toggleContact = (contact)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/contacts/${contact.id}`, {
      favorite: !contact.favorite,
    });
    const updated = response.data;
    dispatch(updateContact(updated));
  };
};

export const fetchContacts = ()=> {
  return async(dispatch)=> {
    const res = await axios.get('/api/contacts');
    const contacts = res.data;
    dispatch(setContacts(contacts));
    dispatch(setLoading(false));
  };
};

export const updateContact = (contact)=> {
  return {
    type: 'UPDATE_CONTACT',
    contact
  };
};

export const setLoading = (loading)=> {
  return {
    type: 'SET_LOADING',
    loading
  };
};
export default store;

