import express from 'express';
const route = express.Router();

import authRoutes from './modules/auth/routes';
import userRoutes from './modules/users/routes';
import bookRoutes from './modules/books/routes';
import borrowRoutes from './modules/borrow/routes';
import reportRoutes from './modules/reports/routes';


route.use('/auth', authRoutes);
route.use('/books', bookRoutes);
route.use('/borrow', borrowRoutes);
route.use('/reports', reportRoutes);
route.use('/users', userRoutes);

export default route;
