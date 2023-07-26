import express from 'express';
import { deleteUser, update } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//update user
router.put('/:id', verifyToken as any, update as any);

//delete user
router.delete('/:id', verifyToken as any, deleteUser as any);

//get a user
// router.get('/find/:id', getUser as any);

export default router;
