import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/schema/index.js';
import scholarshipRoutes from './src/route/scholarshipRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Routes
app.use('/api/v1/scholarships', scholarshipRoutes);

// Add a route to serve the scholarships page
app.get('/', (req, res) => {
    res.sendFile('scholarship.html', { root: './public' });
});

// Database connection
try {
  await sequelize.authenticate();
  console.log('Database connected successfully');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
