export class Contact {
	constructor(id, name, phone, photo = null, fileName) {
		if (!name || !phone) {
			throw new Error("Name and phone number are required");
		}
		//this.id = id;
		this.name = name;
		this.phone = phone;
		this.photo = photo;
		this.fileName = fileName;
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
			fileName: this.fileName,
		};
	}

	// Create Contact from JSON
	static fromJSON(json) {
		return new Contact(json.name, json.phone, json.photo, json.fileName);
	}
}
