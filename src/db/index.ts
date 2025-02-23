import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
config({ path: '.env.local' }); 

export const db = drizzle({ connection: {
  url: process.env.dbURL,
  authToken: process.env.dbAuth
}});