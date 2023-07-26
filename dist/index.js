import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import postRoutes from './routes/users.js';
const app = express();
dotenv.config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO).then(() => {
            console.log('CONNECTED DO MONGODB');
        });
    }
    catch (error) {
        throw error;
    }
};
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message
    });
});
app.listen(8800, () => {
    connect();
});
//# sourceMappingURL=index.js.map