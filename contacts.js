const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const res = await fs.readFile(contactsPath);
    const contacts = JSON.parse(res);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find((contact) => contact.id === contactId);
    if (!foundContact) {
      return null;
    }
    return foundContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const deletedContactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (deletedContactIndex === -1) {
      return null;
    }
    const deletedContact = contacts.splice(deletedContactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = contacts.length + 1;
    const newContact = {
      id: `${id}`,
      name,
      email,
      phone: `${phone}`,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getContactById,
  removeContact,
  addContact,
  listContacts,
};
