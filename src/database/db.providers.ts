import { createConnection } from 'typeorm';
import { config } from 'dotenv';

config();
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost', //process.env.DB_URL
        port: 3306,
        username: 'root', //  process.env.DB_NAME
        password: 'admin', // process.env.DB_PASSWORD
        database: 'Adopcion',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
