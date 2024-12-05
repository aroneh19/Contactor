export class Contact {
	constructor(id, name, phone, photo = null, fileName) {
		if (!name || !phone) {
			throw new Error("Name and phone number are required");
		}
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.photo = photo;
		this.fileName = fileName;
	}

	// Method to validate phone number
	static validatephone(phone) {
		const phoneRegex = /^[6-9][0-9]{6}$/; // Starts with 6-9 and is exactly 7 digits long
		return phoneRegex.test(phone);
	}

	// Convert to JSON
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			phone: this.phone,
			photo: this.photo,
			fileName: this.fileName,
		};
	}

	// Create Contact from JSON
	static fromJSON(json) {
		return new Contact(
			json.id,
			json.name,
			json.phone,
			json.photo,
			json.fileName
		);
	}
}
