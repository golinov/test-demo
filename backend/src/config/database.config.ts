import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  name: process.env.MONGO_DB_NAME,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
}));
