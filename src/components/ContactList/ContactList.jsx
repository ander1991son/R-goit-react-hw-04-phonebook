import { nanoid } from 'nanoid';
import css from './ContactList.module.css';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.ul}>
      {contacts.map(contact => (
        <ContactItem
          key={nanoid()}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;
