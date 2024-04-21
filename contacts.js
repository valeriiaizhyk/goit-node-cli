import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("src", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (typeof contact === "undefined") {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const contact = contacts.findIndex((contact) => contact.id === contactId);

  if (contact === -1) {
    return null;
  }

  const removedContact = contacts[contact];

  contacts.splice(contact, 1);
  await writeContacts(contacts);
  return removedContact;
}

async function addContact(contact) {
  const contacts = await readContacts();

  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
  };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact
}

export default { listContacts, getContactById, removeContact, addContact };