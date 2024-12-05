import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";
import { Contact } from "../models/contactModel";

const contactDirectory = `${FileSystem.documentDirectory}contacts`;

const onException = async (cb, errorHandler) => {
	try {
		const result = await cb();
		return result;
	} catch (err) {
		if (errorHandler) {
			return errorHandler(err);
		}
		throw err;
	}
};

const setupDirectory = async () => {
	const dir = await FileSystem.getInfoAsync(contactDirectory);
	if (!dir.exists) {
		await FileSystem.makeDirectoryAsync(contactDirectory, {
			intermediates: true,
		});
	}
};

// Create contact
export const saveContact = async (name, phone, photo) => {
	await setupDirectory();

	// Validate the phone number
	if (!Contact.validatephone(phone)) {
		throw new Error(
			"Invalid phone number. Must start with 6 or higher, contain only digits, and be 7 digits long."
		);
	}

	const id = Crypto.randomUUID();
	const fileName = `${name}-${id}.json`;
	const filePath = `${contactDirectory}/${fileName}`;

	// Create a new Contact instance
	const contact = new Contact(id, name, phone, photo, fileName);

	// Save the contact using its toJSON method
	await onException(() =>
		FileSystem.writeAsStringAsync(filePath, JSON.stringify(contact.toJSON()))
	);

	return { fileName, id };
};

// Load contact by filename
export const loadContact = async (fileName) => {
	const filePath = `${contactDirectory}/${fileName}`;

	const content = await onException(() =>
		FileSystem.readAsStringAsync(filePath)
	);

	// Reconstruct the Contact instance using fromJSON
	const jsonData = JSON.parse(content);
	return Contact.fromJSON(jsonData);
};

export const getAllContacts = async () => {
	await setupDirectory();

	const files = await onException(() =>
		FileSystem.readDirectoryAsync(contactDirectory)
	);
	return Promise.all(
		files.map(async (fileName) => {
			const contact = await loadContact(fileName);
			return {
				fileName,
				...contact,
			};
		})
	);
};

// Remove a contact by filename
export const removeContact = async (fileName) => {
	const filePath = `${contactDirectory}/${fileName}`;
	return await onException(() =>
		FileSystem.deleteAsync(filePath, { idempotent: true })
	);
};

// Clean the entire contacts directory
export const cleanDirectory = async () => {
	await onException(() =>
		FileSystem.deleteAsync(contactDirectory, { idempotent: true })
	);
};
