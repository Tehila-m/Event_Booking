import path from 'path';
import dotenv from 'dotenv';
import app from './app.js';
import { connectSQLDB } from './config/db.sql.js';
import { connectMongoDB } from './config/db.mongo.js';

dotenv.config({ path: path.resolve('./config/.env') });
const PORT = process.env.PORT || 8888;

const startServer = async () => {
  try {
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    await connectSQLDB();
    console.log('SQL DB connected successfully');

    app.get('/', async (request, reply) => ({ message: 'Server is running!' }));

    await app.listen({ port: PORT });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
