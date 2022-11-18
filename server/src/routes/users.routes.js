import { Router } from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from '../controllers/users';
import { verifyToken, isSuperAdmin, isAdmin } from '../middleware/authJwt';

const router = Router();

router.get('/', verifyToken, getUsers);

router.get('/:userId', [verifyToken, isAdmin], getUserById);

router.put('/:userId', [verifyToken, isSuperAdmin], updateUserById);

router.delete('/:userId', [verifyToken, isSuperAdmin], deleteUserById);

export default router;
