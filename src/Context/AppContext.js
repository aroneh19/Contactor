import React, { createContext, useContext, useState } from "react";

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    return (
        <ContactContext.Provider value={{ contacts, setContacts }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => useContext(ContactContext);
