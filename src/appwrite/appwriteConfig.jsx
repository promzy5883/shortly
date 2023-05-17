import { Client, Account, Databases } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("shortly.jsx");

export const account = new Account(client);

export const databases = new Databases(client, "6464c0519d883ae4511e");
