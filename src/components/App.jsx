import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { Container, Title, MTitle } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const newContact = { ...data, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = ({ id, name }) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    Notiflix.Notify.info(`Contact with name ${name} is deleted`);
  };

  filterChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  filterContacts = () => {
    const fcontacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.trim().toLowerCase());
    });
    return fcontacts;
  };

  render() {
    const { contacts } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm addContact={this.addContact} contacts={contacts} />
        <MTitle>Contacts</MTitle>
        <Filter filterChange={this.filterChange} />
        {contacts.length > 0 && (
          <ContactList
            contacts={this.filterContacts()}
            deleteContact={this.deleteContact}
            filter={this.filter}
          />
        )}
      </Container>
    );
  }
}
export default App;
