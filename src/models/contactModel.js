export class Contact {
    constructor(name, phoneNumber, photo = null) {
      if (!name || !phoneNumber) {
        throw new Error('Name and phone number are required');
      }
  
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.photo = photo;
    }
  
    // Method to validate phone number
    static validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[+]?[0-9]{10,15}$/; // Basic international format
      return phoneRegex.test(phoneNumber);
    }
  
    // Convert to JSON
    toJSON() {
      return {
        name: this.name,
        phoneNumber: this.phoneNumber,
        photo: this.photo,
      };
    }
  
    // Create Contact from JSON
    static fromJSON(json) {
      return new Contact(json.name, json.phoneNumber, json.photo);
    }
  }
  