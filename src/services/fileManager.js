import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

const CONTACTS_DIR = '${FileSystem.documentDirectory}/contacts';
const IMAGES_DIR = '${FileSystem.documentDirectory}/images';

async function ensureDirectoriesExist() {
    await FileSystem.makeDirectoryAsync(CONTACTS_DIR, { intermediates: true });
    await FileSystem.makeDirectoryAsync(IMAGES_DIR, { intermediates: true });
}

// Save contact
export async function saveContact(contactData, imageUri) {
    await ensureDirectoriesExist();

    const contactId = uuidv4();
    const contactFilePath = `${CONTACTS_DIR}/${contactId}.json`;

    let imagePath = null;
    
    // If image is provided
    if (imageUri) {
        const imageFilename = `${IMAGES_DIR}${contactId}.jpg`;
        await FileSystem.moveAsync({
          from: imageUri,
          to: imageFilename,
        });
        imagePath = imageFilename;
      }
    
    // Save contact data 
    const contact = {
        ...contactData,
        id: contactId,
        photo: imagePath,
    };

    await FileSystem.writeAsStringAsync(contactFilePath, JSON.stringify(contact));

    return contact;
}

// Update contact
export async function updateContact(contactId, updatedData) {
    const contactFiles = await FileSystem.readDirectoryAsync(CONTACTS_DIR);

    const updatedContact = null;

    await FileSystem.writeAsStringAsync(contactPath, JSON.stringify(updatedContact));
    return updatedContact;
}

// Delete contact
export async function deleteContact(contactId) {
    const contactFilePath = `${CONTACTS_DIR}/${contactId}.json`;
    
    for (const file of contactFiles) {
        if (file.includes(contactId)) {
            const contactPath = `${CONTACTS_DIR}${file}`;
            const contactData = JSON.parse(await FileSystem.readAsStringAsync(contactPath));
            
            // Delete image if exists
            if (contactData.photo) {
                await FileSystem.deleteAsync(contactData.photo);
            }

            // Delete contact
            await FileSystem.deleteAsync(contactFilePath);
            return;
        }
    }
}