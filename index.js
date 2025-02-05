import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/schema/index.js';
import scholarshipRoutes from './src/route/scholarshipRouter.js';
import userRoutes from './src/route/userRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/scholarships', scholarshipRoutes);
app.use('/api/v1/users', userRoutes);

// Database connection
try {
  await sequelize.authenticate();
  console.log('Database connected successfully');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
