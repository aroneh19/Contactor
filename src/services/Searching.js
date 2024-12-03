// Filter contacts based on search query
export const filterContacts = (contacts, query) => {
    if (!query) {
        return contacts; // Return all contacts if the query is empty
    }
    return contacts.filter(contact =>
        contact.name && // Ensure contact.name exists
        typeof contact.name === 'string' && // Ensure it's a string
        contact.name.toLowerCase().includes(query.toLowerCase()) // Perform case-insensitive match
    );
};
