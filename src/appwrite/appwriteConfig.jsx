import { Client, Account, Databases } from "appwrite";

const client = new Client();

export const databases = new Databases(client);

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("shortly.jsx");

export const account = new Account(client);
