import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const handleAddContact = (name, number) => {
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      Notiflix.Report.failure('Error', `${name} is already in contacts`, 'OK');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className="div-contact">
      <Section title="Phonebook">
        <ContactForm onAddContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </div>
  );
};

export default App;
