import * as FileSystem from "expo-file-system";
import * as Crypto from "expo-crypto";

const contactDirectory = `${FileSystem.documentDirectory}contacts`;

const onException = async (cb, errorHandler) => {
	try {
		const result = await cb();
		return result;
	} catch (err) {
		if (errorHandler) {
			return errorHandler(err);
		}
		console.error(err);
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
export const saveContact = async (name, phoneNumber, photo) => {
	await setupDirectory();

	const id = Crypto.randomUUID();
	const fileName = `${name}-${id}.json`;
	const filePath = `${contactDirectory}/${fileName}`;

	const contact = {
		id,
		name,
		phoneNumber,
		photo,
	};

	await onException(() =>
		FileSystem.writeAsStringAsync(filePath, JSON.stringify(contact))
	);

	return { fileName, id };
};

// Load contact by filename
export const loadContact = async (fileName) => {
	const filePath = `${contactDirectory}/${fileName}`;

	return await onException(() => {
		return FileSystem.readAsStringAsync(filePath).then((content) =>
			JSON.parse(content)
		);
	});
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
