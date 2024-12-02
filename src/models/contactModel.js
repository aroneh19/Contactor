export class Contact {
	constructor(name, phone, photo = null) {
		if (!name || !phone) {
			throw new Error("Name and phone number are required");
		}

		this.name = name;
		this.phone = phone;
		this.photo = photo;
	}

	// Method to validate phone number
	static validatephone(phone) {
		const phoneRegex = /^[+]?[0-9]{10,15}$/; // Basic international format
		return phoneRegex.test(phone);
	}

	// Convert to JSON
	toJSON() {
		return {
			name: this.name,
			phone: this.phone,
			photo: this.photo,
		};
	}

	// Create Contact from JSON
	static fromJSON(json) {
		return new Contact(json.name, json.phone, json.photo);
	}
}
