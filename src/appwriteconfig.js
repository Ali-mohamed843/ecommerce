import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("687f748b003e3601f936"); 

export const databases = new Databases(client);
export { ID };
